import * as DataLoader from 'dataloader'

import {Injectable} from '@graphql-modules/di'
import {User} from 'db/models/User'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
    findUserById(id: number): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
    findUserByUsername(username: string): Promise<User | null>
}

@Injectable()
export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
    dataLoader: DataLoader<number, User>

    constructor() {
        super(User)
        this.dataLoader = new DataLoader(this.batchGetUserById)
    }

    async findUserById(id: number): Promise<User | null> {
        return await this.dataLoader.load(id)
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.findOne({where: {email}})
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return await this.findOne({where: {username}})
    }

    private batchGetUserById = async (ids: number[]) => await User.findAll({where: {id: ids}})
}