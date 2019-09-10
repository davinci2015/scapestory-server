import {Injectable, Inject} from '@graphql-modules/di'

import {tokens} from 'di/tokens'
import {LikeRepositoryInterface} from 'db/repositories/Like'

export interface LikeProviderInterface {
    countLikesForAquascape: (id: number) => Promise<number>
}

@Injectable()
export class LikeProvider implements LikeProviderInterface {
    constructor(
        @Inject(tokens.LIKE_REPOSITORY) private likeRepository: LikeRepositoryInterface
    ) {
    }

    async countLikesForAquascape(id: number) {
        return await this.likeRepository.countLikesForAquascape(id)
    }
}