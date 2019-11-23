import * as DataLoader from 'dataloader'
import {Injectable} from '@graphql-modules/di'
import {User} from 'db/models/User'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
    findUserById(id: number): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
    findBySlug(slug: string): Promise<User | null>
}

@Injectable()
export class UserRepository extends BaseRepository<User>
    implements UserRepositoryInterface {
    dataLoader: DataLoader<number, User>

    constructor() {
        super(User)
        this.dataLoader = new DataLoader(this.batchGetUserById)
    }

    findUserById(id: number): Promise<User | null> {
        return this.dataLoader.load(id)
    }

    findUserByEmail(email: string): Promise<User | null> {
        return this.findOne({where: {email}})
    }

    findBySlug(slug: string): Promise<User | null> {
        return this.findOne({where: {slug}})
    }

    private batchGetUserById = async (ids: number[]) => {
        const users = await this.findAll({where: {id: ids}})
        return users.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
    }
}
