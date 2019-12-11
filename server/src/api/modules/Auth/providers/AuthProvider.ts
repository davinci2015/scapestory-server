/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import {Injectable, Inject} from '@graphql-modules/di'
import {AuthenticationError, UserInputError} from 'apollo-server'
import {Request, Response} from 'express'
import slugify from 'slugify'

import {User} from 'db/models/User'
import {UserRepositoryInterface} from 'db/repositories/User'
import {authenticateFacebook, authenticateGoogle} from 'api/modules/Auth/passport'
import {AuthHelper} from 'utils/AuthHelper'
import {tokens} from 'di/tokens'
import {SocialLoginRepositoryInterface} from 'db/repositories/SocialLogin'
import socialProviders from 'constants/socialProviders'

export type AuthPayload = {
    token: string
    user: User
}

export interface AuthProviderInterface {
    login: (email: string, password: string) => Promise<AuthPayload>
    register: (email: string, password: string) => Promise<AuthPayload>
    facebookRegister: (token: string, req: Request, res: Response) => Promise<AuthPayload | undefined>
    googleRegister: (token: string, req: Request, res: Response) => Promise<AuthPayload | undefined>
    userProfileSlugExists: (slug: string) => Promise<boolean>
}

interface SocialLoginData {
    socialProfileId: string
    email: string
    name: string
    profileImage: string
    provider: string
}

@Injectable()
export class AuthProvider implements AuthProviderInterface {
    constructor(
        @Inject(tokens.USER_REPOSITORY)
        private userRepository: UserRepositoryInterface,
        @Inject(tokens.SOCIAL_LOGIN_REPOSITORY)
        private socialLoginRepository: SocialLoginRepositoryInterface
    ) {}

    async userProfileSlugExists(slug: string) {
        return Boolean(await this.userRepository.findUserBySlug(slug))
    }

    async emailExists(email: string) {
        return Boolean(await this.userRepository.findUserByEmail(email))
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {email},
            raw: true,
        })

        if (!user) {
            throw new AuthenticationError('Unauthorized')
        }

        if (!AuthHelper.checkPassword(password, user.password)) {
            throw new AuthenticationError('Unauthorized')
        }

        return {token: AuthHelper.createJWTToken(user.id), user}
    }

    async register(email: string, password: string) {
        if (await this.emailExists(email)) {
            throw new UserInputError('User with provided email already exists')
        }

        let slug = this.slugifyProfileUrl(email.substring(0, email.lastIndexOf('@')))

        const slugExists = await this.userProfileSlugExists(slug)

        if (slugExists) {
            slug = await this.generateUniqueSlug(slug)
        }

        const user = await this.userRepository.create({
            name: slug,
            email,
            slug,
            password: AuthHelper.cryptPassword(password),
        })

        return {token: AuthHelper.createJWTToken(user.id), user}
    }

    async facebookRegister(token: string, req: Request, res: Response) {
        req.body = {...req.body, access_token: token}

        const {data} = await authenticateFacebook(req, res)

        if (data && data.profile) {
            return this.handleSocialLogin({
                email: data.profile.emails[0].value,
                name: data.profile.displayName,
                profileImage: data.profile.photos[0].value,
                provider: socialProviders.FACEBOOK,
                socialProfileId: data.profile.id,
            })
        }
    }

    async googleRegister(token: string, req: Request, res: Response) {
        req.body = {...req.body, access_token: token}

        const {data} = await authenticateGoogle(req, res)

        if (data && data.profile) {
            return this.handleSocialLogin({
                email: data.profile.emails[0].value,
                name: data.profile.displayName,
                profileImage: data.profile._json.picture,
                provider: socialProviders.GOOGLE,
                socialProfileId: data.profile.id,
            })
        }
    }

    private async generateUniqueSlug(base: string): Promise<string> {
        let uniqueSlug: string

        return new Promise(async resolve => {
            while (!uniqueSlug) {
                const randomNumber = Math.floor(Math.random() * 10000 + 1)
                const possibleSlug = `${base}${randomNumber}`
                const slugExists = await this.userProfileSlugExists(possibleSlug)

                if (!slugExists) {
                    uniqueSlug = possibleSlug
                    resolve(uniqueSlug)
                }
            }
        })
    }

    private slugifyProfileUrl(slug: string) {
        const replacement = '_'
        return slugify(slug, {replacement, lower: true})
    }

    private async handleSocialLogin(data: SocialLoginData) {
        let user: User | null
        let slug = this.slugifyProfileUrl(data.name)

        const slugExists = await this.userProfileSlugExists(slug)

        if (slugExists) {
            slug = await this.generateUniqueSlug(slug)
        }

        const userToCreate = {
            slug,
            name: data.name,
            email: data.email,
            profileImage: data.profileImage,
        }

        const social = await this.socialLoginRepository.findSocialLogin(data.socialProfileId)

        if (social) {
            user = await this.userRepository.findUserById(social.userId)

            if (!user) {
                user = await this.userRepository.create(userToCreate)
            }

            return {user, token: AuthHelper.createJWTToken(user.id)}
        } else {
            user = await this.userRepository.findUserByEmail(data.email)

            if (!user) {
                user = await this.userRepository.create(userToCreate)
            }

            await this.socialLoginRepository.create({
                userId: user.id,
                socialId: data.socialProfileId,
                provider: data.provider,
            })

            return {user, token: AuthHelper.createJWTToken(user.id)}
        }
    }
}