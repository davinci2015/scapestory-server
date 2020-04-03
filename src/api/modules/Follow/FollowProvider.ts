import {UserInputError} from 'apollo-server'
import {Injectable, Inject} from '@graphql-modules/di'

import {Follow} from 'db/models/Follow'
import {User} from 'db/models/User'
import {FollowRepositoryInterface} from 'db/repositories/Follow'
import {UserRepositoryInterface} from 'db/repositories/User'
import {tokens} from 'di/tokens'

export interface FollowProviderInterface {
    followUser: (followedId: number, followerId: number) => Promise<Follow | null>
    unfollowUser: (followedId: number, followerId: number) => Promise<Follow | null>
    isFollowedBy: (followerId: number, followedId: number) => Promise<boolean>
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
}

@Injectable()
export class FollowProvider implements FollowProviderInterface {
    constructor(
        @Inject(tokens.FOLLOW_REPOSITORY)
        private followRepository: FollowRepositoryInterface,
        @Inject(tokens.USER_REPOSITORY)
        private userRepository: UserRepositoryInterface
    ) {}

    async followUser(followedId: number, followerId: number) {
        const [follower, followed] = await this.findUsers(followerId, followedId)

        if (!follower || !followed) {
            throw new UserInputError('User does not exist')
        }

        return this.followRepository.followUser(followedId, followerId)
    }

    async unfollowUser(followedId: number, followerId: number) {
        const [follower, followed] = await this.findUsers(followerId, followedId)

        if (!follower || !followed) {
            throw new UserInputError('User does not exist')
        }

        return this.followRepository.unfollowUser(followedId, followerId)
    }

    getFollows(userId: number) {
        return this.followRepository.getFollows(userId)
    }

    isFollowedBy(followerId: number, followedId: number) {
        return this.followRepository.isFollowedBy(followerId, followedId)
    }

    private async findUsers(followerId: number, followedId: number) {
        return await Promise.all([
            this.userRepository.findOne({where: {id: followerId}}),
            this.userRepository.findOne({where: {id: followedId}}),
        ])
    }
}
