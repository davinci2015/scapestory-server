import {Injectable, Inject} from '@graphql-modules/di'
import {tokens} from 'di/tokens'
import {UserRepositoryInterface} from 'db/repositories/User'
import {User} from 'db/models/User'

export interface UsersProviderInterface {
    findUserById: (id: number) => Promise<User | null>,
    getAllUsers: () => Promise<User[]>
}

@Injectable()
export class UsersProvider implements UsersProviderInterface {
    constructor(@Inject(tokens.USER_REPOSITORY) private userRepository: UserRepositoryInterface) {
    }

    async findUserById(id: number) {
        return await this.userRepository.findUserById(id)
    }

    async getAllUsers() {
        return await this.userRepository.findAll()
    }
}