import {Injectable, Inject} from '@graphql-modules/di'
import {AuthenticationError, UserInputError} from 'apollo-server'
import {Request, Response} from 'express'
import slugify from 'slugify'

import {User} from 'db/models/User'
import {UserRepositoryInterface} from 'db/repositories/User'
import {authenticateFacebook, authenticateGoogle} from 'graphql/modules/Auth/passport'
import {AuthHelper} from 'utils/AuthHelper'
import {tokens} from 'di/tokens'
import {SocialLoginRepositoryInterface} from 'db/repositories/SocialLogin'
import socialProviders from 'constants/socialProviders'
import {SocialLogin} from 'db/models/SocialLogin'

export type AuthPayload = {
    token: string,
    user: User
}

export interface AuthProviderInterface {
    login: (email: string, password: string) => Promise<AuthPayload>
    register: (email: string, password: string) => Promise<AuthPayload>
    facebookRegister: (token: string, req: Request, res: Response) => Promise<AuthPayload | undefined>
    googleRegister: (token: string, req: Request, res: Response) => Promise<AuthPayload | undefined>
    usernameExists: (username: string) => Promise<boolean>
}

interface SocialLoginData {
    socialProfileId: string
    email: string
    username: string
    profileImage: string
    provider: string
}

@Injectable()
export class AuthProvider implements AuthProviderInterface {
    constructor(
        @Inject(tokens.USER_REPOSITORY) private userRepository: UserRepositoryInterface,
        @Inject(tokens.SOCIAL_LOGIN_REPOSITORY) private socialLoginRepository: SocialLoginRepositoryInterface,
    ) {
    }

    async usernameExists(username: string) {
        return Boolean(await this.userRepository.findUserByUsername(username))
    }

    async emailExists(email: string) {
        return Boolean(await this.userRepository.findUserByEmail(email))
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({where: {email}, raw: true})

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

        let username = this.slugifyUsername(email.substring(0, email.lastIndexOf('@')))

        const usernameExists = await this.usernameExists(username)

        if (usernameExists) {
           username = await this.generateUniqueUsername(username)
        }

        const hashedPassword = AuthHelper.cryptPassword(password)

        const user = await this.userRepository.create({
            email,
            username,
            password: hashedPassword
        })

        return {token: AuthHelper.createJWTToken(user.id), user}
    }

    async facebookRegister(token: string, req: Request, res: Response) {
        req.body = {...req.body, access_token: token}

        const {data} = await authenticateFacebook(req, res)

        if (data && data.profile) {
            return this.handleSocialLogin({
                email: data.profile.emails[0].value,
                username: data.profile.displayName,
                profileImage: data.profile.photos[0].value,
                provider: socialProviders.FACEBOOK,
                socialProfileId: data.profile.id
            })
        }
    }

    async googleRegister(token: string, req: Request, res: Response) {
        req.body = {...req.body, access_token: token}

        const {data} = await authenticateGoogle(req, res)

        if (data && data.profile) {
            return this.handleSocialLogin({
                email: data.profile.emails[0].value,
                username: data.profile.displayName,
                profileImage: data.profile._json.picture,
                provider: socialProviders.GOOGLE,
                socialProfileId: data.profile.id
            })
        }
    }

    private async generateUniqueUsername(base: string): Promise<string> {
        let uniqueUsername

        return new Promise(async (resolve) => {
            while (!uniqueUsername) {
                const randomNumber =  Math.floor((Math.random() * 10000) + 1)
                const possibleUsername = `${base}${randomNumber}`
                const usernameExists = await this.usernameExists(possibleUsername)

                if (!usernameExists) {
                    uniqueUsername = possibleUsername
                    resolve(uniqueUsername)
                }
            }
        })
    }

    private slugifyUsername(username: string) {
        const replacement = '_'
        return slugify(username, {replacement, lower: true})
    }

    private async handleSocialLogin(data: SocialLoginData) {
        let social: SocialLogin | null
        let user: User | null
        let username = this.slugifyUsername(data.username)

        const usernameExists = await this.usernameExists(username)

        if (usernameExists) {
            username = await this.generateUniqueUsername(username)
        }

        const userToCreate = {
            email: data.email,
            username: this.slugifyUsername(username),
            profileImage: data.profileImage
        }

        social = await this.socialLoginRepository.findSocialLogin(data.socialProfileId)

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
                provider: data.provider
            })

            return {user, token: AuthHelper.createJWTToken(user.id)}
        }
    }
}