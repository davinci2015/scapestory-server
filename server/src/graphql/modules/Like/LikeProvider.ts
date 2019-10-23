import {Injectable, Inject} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {LikeRepositoryInterface, LikeEntityType} from 'db/repositories/Like'
import {Like} from 'db/models/Like'

export interface LikeProviderInterface {
    like(entity: LikeEntityType, entityId: number, userId: number): Bluebird<Like>

    dislike(entity: LikeEntityType, entityId: number, userId: number): Bluebird<Like>
}

@Injectable()
export class LikeProvider implements LikeProviderInterface {
    constructor(
        @Inject(tokens.LIKE_REPOSITORY) private likeRepository: LikeRepositoryInterface
    ) {
    }

    like(entity: LikeEntityType, entityId: number, userId: number) {
        return this.likeRepository.like(entity, entityId, userId)
    }

    dislike(entity: LikeEntityType, entityId: number, userId: number) {
        return this.likeRepository.dislike(entity, entityId, userId)
    }
}