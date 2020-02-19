import {UserInputError} from 'apollo-server'
import {Injectable, Inject} from '@graphql-modules/di'

import {Follow} from 'db/models/Follow'
import {FollowRepositoryInterface} from 'db/repositories/Follow'
import {UserRepositoryInterface} from 'db/repositories/User'
import {User} from 'db/models/User'
import {tokens} from 'di/tokens'

export interface FollowProviderInterface {
    followUser: (followedId: number, followerId: number) => Promise<User>
    unfollowUser: (followedId: number, followerId: number) => Promise<User>
    isFollowedBy: (followerId: number, followedId: number) => Promise<boolean>
    getFollows: (userId: number) => Promise<{followers: Follow[]; following: Follow[]}>
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

        await this.followRepository.followUser(followedId, followerId)

        return followed
    }

    async unfollowUser(followedId: number, followerId: number) {
        const [follower, followed] = await this.findUsers(followerId, followedId)

        if (!follower || !followed) {
            throw new UserInputError('User does not exist')
        }

        await this.followRepository.unfollowUser(followedId, followerId)

        return followed
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
