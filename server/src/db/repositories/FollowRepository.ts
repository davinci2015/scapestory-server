import {Injectable} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'
import {Follow} from 'db/models/Follow'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/BaseRepository'

export interface FollowRepositoryInterface extends BaseRepositoryInterface<Follow> {
    followUser: (followerUserId: number, followedUserId: number) => Bluebird<Follow | null>,
    unfollowUser: (followerUserId: number, followedUserId: number) => Bluebird<Follow | null>
}

@Injectable()
export class FollowRepository extends BaseRepository<Follow> {
    constructor() {
        super(Follow)
    }

    followUser(followerUserId: number, followedUserId: number) {
        return this.create({followerUserId, followedUserId})
    }

    unfollowUser(followerUserId: number, followedUserId: number) {
        return this.destroy({where: {followerUserId, followedUserId}})
    }
}