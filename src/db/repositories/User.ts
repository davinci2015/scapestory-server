import {Injectable} from 'graphql-modules'

import {User} from 'db/models/User'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
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
    constructor() {
        super(User)
    }

    findUserById(id: number): Promise<User | null> {
        return this.findOne({where: {id}})
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
                profileImage: url,
                profileImagePublicId: publicId,
            },
            {where: {id: userId}}
        )
    }

    updateCoverImage(userId: number, publicId: string, url: string) {
        return this.update(
            {
                coverImage: url,
                coverImagePublicId: publicId,
            },
            {where: {id: userId}}
        )
    }

    updateUserDetails(userId: number, userDetails: UserDetails) {
        return this.update(userDetails, {where: {id: userId}, returning: true})
    }
}
