import {Injectable, Inject} from '@graphql-modules/di'
import {tokens} from 'di/tokens'
import {UserRepositoryInterface} from 'db/repositories/User'
import {User} from 'db/models/User'
import Bluebird from 'bluebird'

export interface UsersProviderInterface {
    findUserById: (id: number) => Promise<User | null>
    findUserBySlug: (slug: string) => Promise<User | null>
    getAllUsers: () => Bluebird<User[]>
}

@Injectable()
export class UsersProvider implements UsersProviderInterface {
    constructor(
        @Inject(tokens.USER_REPOSITORY)
        private userRepository: UserRepositoryInterface
    ) {}

    findUserById(id: number) {
        return this.userRepository.findUserById(id)
    }

    findUserBySlug(slug: string) {
        return this.userRepository.findUserBySlug(slug)
    }

    getAllUsers() {
        return this.userRepository.findAll()
    }
}
