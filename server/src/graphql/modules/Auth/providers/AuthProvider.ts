import {Injectable, Inject} from '@graphql-modules/di'
import {User} from 'db/models/User'
import {UserRepositoryInterface} from 'db/repositories/UserRepository'
import {tokens} from 'di/tokens'

export type AuthPayload = {
    token: String
    user: User
}

export interface AuthProviderInterface {
    login: (email: string, password: string) => Promise<AuthPayload>
}

@Injectable()
export class AuthProvider implements AuthProviderInterface {
    constructor(@Inject(tokens.USER_REPOSITORY) private userRepository: UserRepositoryInterface) {
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.create({email, password})

        return {
            token: 'random',
            user
        }
    }
}