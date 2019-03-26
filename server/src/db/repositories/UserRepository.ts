import {Injectable} from '@graphql-modules/di'
import {User} from 'db/models/User'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/BaseRepository'

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
}

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User)
    }
}