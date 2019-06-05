import {Injectable} from '@graphql-modules/di'
import {User} from 'db/models/User'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
    findUserById(id: number): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
}

@Injectable()
export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
    constructor() {
        super(User)
    }

    async findUserById(id: number): Promise<User | null> {
        return await this.findOne({where: {id}})
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.findOne({where: {email}})
    }
}