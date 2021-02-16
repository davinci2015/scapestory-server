import {Injectable, Inject} from 'graphql-modules'

import {LikeRepositoryInterface, LikeRepository} from 'db/repositories/Like'
import {Like} from 'db/models/Like'
import {LikeEntityType} from 'interfaces/graphql/types'
import {NotificationRepositoryInterface, NotificationRepository} from 'db/repositories/Notification'

export interface LikeProviderInterface {
    getLikeById(id: number): Promise<Like | null>
    getLikes(
        entity: LikeEntityType,
        entityId: number,
        limit?: number
    ): Promise<{rows: Like[]; count: number}>
    like(entity: LikeEntityType, entityId: number, userId: number): Promise<Like>
    dislike(entity: LikeEntityType, entityId: number, userId: number): Promise<Like>
    removeLikes(data: {entity: LikeEntityType; entityId: number}[]): Promise<number>
    isLikedBy(userId: number, entity: LikeEntityType, entityId: number): Promise<boolean>
}

@Injectable()
export class LikeProvider implements LikeProviderInterface {
    constructor(
        @Inject(LikeRepository)
        private likeRepository: LikeRepositoryInterface,
        @Inject(NotificationRepository)
        private notificationRepository: NotificationRepositoryInterface
    ) {}

    getLikeById(id: number) {
        return this.likeRepository.findOne({where: {id}})
    }

    like(entity: LikeEntityType, entityId: number, userId: number) {
        return this.likeRepository.like(entity, entityId, userId)
    }

    async dislike(entity: LikeEntityType, entityId: number, userId: number) {
        const like = await this.likeRepository.dislike(entity, entityId, userId)
        this.notificationRepository.destroy({where: {id: like.id}})

        return like
    }

    removeLikes(data: {entity: LikeEntityType; entityId: number}[]) {
        return this.likeRepository.removeLikes(data)
    }

    isLikedBy(userId: number, entity: LikeEntityType, entityId: number) {
        return this.likeRepository.isLikedBy(userId, entity, entityId)
    }

    getLikes(entity: LikeEntityType, entityId: number, limit?: number) {
        return this.likeRepository.getLikes(entity, entityId, limit)
    }
}
