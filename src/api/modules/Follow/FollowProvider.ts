import {UserInputError} from 'apollo-server'
import {Injectable, Inject} from '@graphql-modules/di'

import {Follow} from 'db/models/Follow'
import {FollowRepositoryInterface} from 'db/repositories/Follow'
import {UserRepositoryInterface} from 'db/repositories/User'
import {tokens} from 'di/tokens'

export interface FollowProviderInterface {
    followUser: (followedId: number, followerId: number) => Promise<Follow>
    unfollowUser: (followedId: number, followerId: number) => Promise<Follow>
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
        if (followedId === followerId) {
            throw new UserInputError('You can\t follow yourself.')
        }

        const [follower, followed] = await this.findUsers(followerId, followedId)

        if (!follower || !followed) {
            throw new UserInputError('User does not exist')
        }

        const follow = await this.followRepository.followUser(followedId, followerId)

        if (!follow) {
            throw new UserInputError(`User ${follower.name} is already following ${followed.name}`)
        }

        return follow
    }

    async unfollowUser(followedId: number, followerId: number) {
        if (followedId === followerId) {
            throw new UserInputError('You can\t unfollow yourself.')
        }

        const [follower, followed] = await this.findUsers(followerId, followedId)

        if (!follower || !followed) {
            throw new UserInputError('User does not exist')
        }

        const unfollow = await this.followRepository.unfollowUser(followedId, followerId)

        if (!unfollow) {
            throw new UserInputError('Non-existent follow relationship')
        }

        return unfollow
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
