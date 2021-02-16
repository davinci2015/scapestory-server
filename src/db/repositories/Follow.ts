import {Injectable} from 'graphql-modules'
import {Follow} from 'db/models/Follow'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'

export interface FollowRepositoryInterface extends BaseRepositoryInterface<Follow> {
    followUser: (followedId: number, followerId: number) => Promise<Follow | null>
    unfollowUser: (followedId: number, followerId: number) => Promise<Follow | null>
    getFollows: (
        userId: number
    ) => Promise<{
        followers: {
            rows: Follow[]
            count: number
        }
        following: {
            rows: Follow[]
            count: number
        }
    }>
    isFollowedBy: (followerId: number, followedId: number) => Promise<boolean>
}

@Injectable()
export class FollowRepository extends BaseRepository<Follow> implements FollowRepositoryInterface {
    constructor() {
        super(Follow)
    }

    async followUser(followedId: number, followerId: number) {
        const existingFollow = await this.findOne({
            where: {
                followerUserId: followerId,
                followedUserId: followedId,
            },
        })

        if (existingFollow) {
            return null
        }

        return this.create({followerUserId: followerId, followedUserId: followedId})
    }

    async unfollowUser(followedId: number, followerId: number) {
        const follow = await this.findOne({
            where: {followerUserId: followerId, followedUserId: followedId},
        })

        if (!follow) {
            return null
        }

        follow.destroy()

        return follow
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
            this.findAndCountAll({where: {followedUserId: userId}}),
            this.findAndCountAll({where: {followerUserId: userId}}),
        ])

        return {
            followers,
            following,
        }
    }
}
