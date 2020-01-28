import {Injectable} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'
import {Follow} from 'db/models/Follow'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'

export interface FollowRepositoryInterface
    extends BaseRepositoryInterface<Follow> {
    followUser: (
        followedId: number,
        followerId: number
    ) => Bluebird<Follow | null>
    unfollowUser: (
        followedId: number,
        followerId: number
    ) => Bluebird<Follow | null>
    getFollows: (
        userId: number
    ) => Promise<{followers: Follow[], following: Follow[]}>
    isFollowedBy: (followerId: number, followedId: number) => Promise<boolean>
}

@Injectable()
export class FollowRepository extends BaseRepository<Follow> {
    constructor() {
        super(Follow)
    }

    followUser(followedId: number, followerId: number) {
        return this.create({followerUserId: followerId, followedUserId: followedId})
    }

    unfollowUser(followedId: number, followerId: number) {
        return this.destroy({where: {followerUserId: followerId, followedUserId: followedId}})
    }

    async isFollowedBy(followerId: number, followedId: number) {
        const follow = await this.findOne({
            where: {
                followerUserId: followerId,
                followedUserId: followedId,
            },
        })

        return Boolean(follow)
    }

    async getFollows(userId: number) {
        const [followers, following] = await Promise.all([
            this.findAll({where: {followedUserId: userId}}),
            this.findAll({where: {followerUserId: userId}}),
        ])

        return {
            followers,
            following,
        }
    }
}
