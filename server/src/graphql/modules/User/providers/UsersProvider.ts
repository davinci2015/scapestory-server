import {Injectable, Inject} from '@graphql-modules/di'
import {Follow} from 'db/models/Follow'
import {tokens} from 'di/tokens'
import {UserRepositoryInterface} from 'db/repositories/UserRepository'
import {User} from 'db/models/User'

export interface UsersProviderInterface {
    getUser: (id: number) => Promise<User | null>,
    getAllUsers: () => Promise<User[]>
}

@Injectable()
export class UsersProvider implements UsersProviderInterface {
    constructor(@Inject(tokens.USER_REPOSITORY) private userRepository: UserRepositoryInterface) {
    }

    async getUser(id: number) {
        return await this.userRepository.findOne({
            where: {id},
            include: [
                {model: Follow, as: 'followers'},
                {model: Follow, as: 'following'}
            ]
        })
    }

    async getAllUsers() {
        return await this.userRepository.findAll()
    }
}