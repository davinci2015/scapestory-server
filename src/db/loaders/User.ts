import * as DataLoader from 'dataloader'
import {Inject, Injectable, Scope} from 'graphql-modules'

import {User} from 'db/models/User'
import {UserRepository, UserRepositoryInterface} from 'db/repositories/User'
import {BaseDataLoader} from 'db/loaders/Base'

export interface UserDataLoaderInterface {
    findUserById(id: number): Promise<User | null>
}

@Injectable({scope: Scope.Operation})
export class UserDataLoader extends BaseDataLoader implements UserDataLoaderInterface {
    dataLoader: DataLoader<number, User>

    constructor(@Inject(UserRepository) private userRepository: UserRepositoryInterface) {
        super()
        this.dataLoader = new DataLoader(this.batchGetUserById)
    }

    findUserById(id: number): Promise<User | null> {
        return this.dataLoader.load(id)
    }

    private batchGetUserById = async (ids: number[]) => {
        const users = await this.userRepository.findAll({where: {id: ids}})

        return this.ensureOrder({
            docs: users,
            keys: ids,
            prop: 'id',
        })
    }
}
