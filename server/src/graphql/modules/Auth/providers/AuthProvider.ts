import {Injectable, Inject} from '@graphql-modules/di'
import {AuthenticationError, UserInputError} from 'apollo-server'
import {User} from 'db/models/User'
import {UserRepositoryInterface} from 'db/repositories/User'
import {Request, Response} from 'express'
import {authenticateFacebook} from 'graphql/modules/Auth/passport'
import {AuthHelper} from 'utils/AuthHelper'
import {tokens} from 'di/tokens'
import {SocialLoginRepositoryInterface} from 'db/repositories/SocialLogin'
import {appConstants} from 'constants/appConstants'
import {SocialLogin} from 'db/models/SocialLogin'

export type AuthPayload = {
    token: string,
    user: User
}

export interface AuthProviderInterface {
    login: (email: string, password: string) => Promise<AuthPayload>
    register: (email: string, name: string, password: string) => Promise<AuthPayload>
    facebookRegister: (token: string, req: Request, res: Response) => Promise<AuthPayload | undefined>
    usernameExists: (username: string) => Promise<boolean>
}

@Injectable()
export class AuthProvider implements AuthProviderInterface {
    constructor(
        @Inject(tokens.USER_REPOSITORY) private userRepository: UserRepositoryInterface,
        @Inject(tokens.SOCIAL_LOGIN_REPOSITORY) private socialLoginRepository: SocialLoginRepositoryInterface,
    ) {
    }

    async usernameExists(username: string) {
        return Boolean(await this.userRepository.findOne({where: {username}}))
    }

    async emailExists(email: string) {
        return Boolean(await this.userRepository.findOne({where: {email}}))
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

    async register(email: string, username: string, password: string) {
        if (await this.usernameExists(username) || await this.emailExists(email)) {
            throw new UserInputError('User with provided email or username already exists')
        }

        const hashedPassword = AuthHelper.cryptPassword(password)
        const user = await this.userRepository.create({
            email, username,
            password: hashedPassword
        })

        return {token: AuthHelper.createJWTToken(user.id), user}
    }

    async facebookRegister(token: string, req: Request, res: Response) {
        let social: SocialLogin | null
        let user: User | null

        req.body = {...req.body, access_token: token}

        const {data} = await authenticateFacebook(req, res)

        if (data && data.profile) {
            const userToCreate = {
                email: data.profile.emails[0].value,
                username: data.profile.displayName,
                profileImage: data.profile.photos[0].value
            }

            social = await this.socialLoginRepository.findFacebookLogin(data.profile.id)

            if (social) {
                user = await this.userRepository.findUserById(social.userId)

                if (!user) {
                    user = await this.userRepository.create(userToCreate)
                }

                return {user, token: AuthHelper.createJWTToken(user.id)}
            } else {
                user = await this.userRepository.findUserByEmail(data.profile.emails[0].value)

                if (!user) {
                    user = await this.userRepository.create(userToCreate)
                }

                await this.socialLoginRepository.create({
                    userId: user.id,
                    socialId: data.profile.id,
                    provider: appConstants.socialLoginProviders.FACEBOOK
                })

                return {user, token: AuthHelper.createJWTToken(user.id)}
            }
        }
    }
}