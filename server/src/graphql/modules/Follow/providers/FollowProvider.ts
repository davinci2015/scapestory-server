import {Injectable, Inject} from '@graphql-modules/di'
import {FollowRepositoryInterface} from 'db/repositories/FollowRepository'
import {UserRepositoryInterface} from 'db/repositories/UserRepository'
import {User} from 'db/models/User'
import {tokens} from 'di/tokens'
import {UserInputError} from 'apollo-server'

export interface FollowProviderInterface {
    followUser: (followerId: number, followedId: number) => Promise<User>,
    unfollowUser: (followerId: number, followedId: number) => Promise<User>
}

@Injectable()
export class FollowProvider implements FollowProviderInterface {
    constructor(
        @Inject(tokens.FOLLOW_REPOSITORY) private followRepository: FollowRepositoryInterface,
        @Inject(tokens.USER_REPOSITORY) private userRepository: UserRepositoryInterface
    ) {
    }

    async followUser(followerId: number, followedId: number) {
        const [follower, followed] = await this.findUsers(followerId, followedId)

        if (!follower || !followed) {
            throw new UserInputError('User does not exist')
        }

        await this.followRepository.followUser(followerId, followedId)

        return followed
    }

    async unfollowUser(followerId: number, followedId: number) {
        const [follower, followed] = await this.findUsers(followerId, followedId)

        if (!follower || !followed) {
            throw new UserInputError('User does not exist')
        }

        await this.followRepository.unfollowUser(followerId, followedId)

        return followed
    }

    private async findUsers(followerId: number, followedId: number) {
        return await Promise.all([
            this.userRepository.findOne({where: {id: followerId}}),
            this.userRepository.findOne({where: {id: followedId}})
        ])
    }
}