import {Injectable} from '@graphql-modules/di'
import {User} from 'db/models/User'

export type AuthPayload = {
    token: String
    user: User
}

export interface AuthProviderInterface {
    login: (email: string, password: string) => Promise<AuthPayload>
}

@Injectable()
export class AuthProvider implements AuthProviderInterface {
    async login(email: string, password: string) {
        const user = await User.create({email, password})

        return {
            token: 'random',
            user
        }
    }
}