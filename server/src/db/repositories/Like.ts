import {Injectable} from '@graphql-modules/di'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Like} from 'db/models/Like'

export interface LikeRepositoryInterface extends BaseRepositoryInterface<Like> {
    countLikesForAquascape(id: number): Promise<number>
}

@Injectable()
export class LikeRepository extends BaseRepository<Like> {
    async countLikesForAquascape(aquascapeId: number) {
        return await this.count({where: {aquascapeId}})
    }
}