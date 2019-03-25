import {Injectable} from '@graphql-modules/di'
import {User} from 'db/models/User'
import {BaseRepository} from 'db/repositories/BaseRepository'

export type AuthPayload = {
    token: String
    user: User
}


@Injectable()
export class UserRepository extends BaseRepository<User> {}