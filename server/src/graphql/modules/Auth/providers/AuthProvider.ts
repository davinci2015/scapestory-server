import {Injectable, Inject} from '@graphql-modules/di'
import {AuthenticationError} from 'apollo-server'
import {User} from 'db/models/User'
import {UserRepositoryInterface} from 'db/repositories/UserRepository'
import {tokens} from 'di/tokens'
import {AuthHelper} from 'utils/AuthHelper'

export type AuthPayload = {
    token: String
    user: User
}

export interface AuthProviderInterface {
    login: (email: string, password: string) => Promise<AuthPayload>,
    register: (email: string, password: string) => Promise<AuthPayload>
}

@Injectable()
export class AuthProvider implements AuthProviderInterface {
    constructor(@Inject(tokens.USER_REPOSITORY) private userRepository: UserRepositoryInterface) {
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

    async register(email: string, password: string) {
        const hashedPassword = AuthHelper.cryptPassword(password)
        const user = await this.userRepository.create({email, password: hashedPassword})

        return {token: AuthHelper.createJWTToken(user), user}
    }
}