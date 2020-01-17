import * as DataLoader from 'dataloader'
import {Injectable} from '@graphql-modules/di'

import {User} from 'db/models/User'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {GraphQLHelper} from 'utils/GraphQLHelper'
import {UserDetails} from 'interfaces/graphql/types'

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
    findUserById(id: number): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
    findUserBySlug(slug: string): Promise<User | null>
    updateProfileImage(userId: number, publicId: string, url: string): Promise<[number, User[]]>
    updateCoverImage(userId: number, publicId: string, url: string): Promise<[number, User[]]>
    updateUserDetails(userId: number, userDetails: UserDetails): Promise<[number, User[]]>
}

@Injectable()
export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
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

    findUserBySlug(slug: string): Promise<User | null> {
        return this.findOne({where: {slug}})
    }

    updateProfileImage(userId: number, publicId: string, url: string) {
        return this.update(
            {
                profileImageUrl: url,
                profileImagePublicId: publicId,
            },
            {where: {id: userId}}
        )
    }

    updateCoverImage(userId: number, publicId: string, url: string) {
        return this.update(
            {
                coverImageUrl: url,
                coverImagePublicId: publicId,
            },
            {where: {id: userId}}
        )
    }

    updateUserDetails(userId: number, userDetails: UserDetails) {
        return this.update(userDetails, {where: {id: userId}})
    }

    private batchGetUserById = async (ids: number[]) => {
        const users = await this.findAll({where: {id: ids}})
        return GraphQLHelper.ensureOrder({
            docs: users,
            keys: ids,
            prop: 'id',
        })
    }
}
