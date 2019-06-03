import {Injectable, Inject} from '@graphql-modules/di'
import {AuthenticationError, UserInputError} from 'apollo-server'
import {User} from 'db/models/User'
import {UserRepositoryInterface} from 'db/repositories/UserRepository'
import {Request, Response} from 'express'
import {authenticateFacebook} from 'graphql/modules/Auth/passport'
import {AuthHelper} from 'utils/AuthHelper'
import {tokens} from 'di/tokens'

export type AuthPayload = {
    token: string,
    user: User
}

export interface AuthProviderInterface {
    login: (email: string, password: string) => Promise<AuthPayload>
    register: (email: string, name: string, password: string) => Promise<AuthPayload>
    facebookRegister: (token: string, req: Request, res: Response) => Promise<AuthPayload>
    usernameExists: (username: string) => Promise<boolean>
}

@Injectable()
export class AuthProvider implements AuthProviderInterface {
    constructor(@Inject(tokens.USER_REPOSITORY) private userRepository: UserRepositoryInterface) {
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

        return {token: AuthHelper.createJWTToken(user), user}
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

        return {token: AuthHelper.createJWTToken(user), user}
    }

    async facebookRegister(token: string, req: Request, res: Response) {
        let user: User

        req.body = {...req.body, access_token: token}

        const {data} = await authenticateFacebook(req, res)

        if (data.profile) {
            user = await this.userRepository.findOne({
                where: {
                    email: data.profile.emails[0].value
                }
            })
        }

        if (!user) {
            user = await this.userRepository.create({
                email: data.profile.emails[0].value,
                username: data.profile.displayName,
                profileImage: data.profile.photos[0].value
            })
        }

        return {user, token: AuthHelper.createJWTToken(user)}
    }
}