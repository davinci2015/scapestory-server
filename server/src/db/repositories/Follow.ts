import {Injectable} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'
import {Follow} from 'db/models/Follow'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'

export interface FollowRepositoryInterface extends BaseRepositoryInterface<Follow> {
    followUser: (followerUserId: number, followedUserId: number) => Bluebird<Follow | null>,
    unfollowUser: (followerUserId: number, followedUserId: number) => Bluebird<Follow | null>,
    getFollows: (userId: number) => Bluebird<{ followers: Follow[], following: Follow[] }>
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

    async getFollows(userId: number) {
        const [followers, following] = await Promise.all([
            this.findAll({where: {followedUserId: userId}}),
            this.findAll({where: {followerUserId: userId}})
        ])

        return {
            followers,
            following
        }
    }
}