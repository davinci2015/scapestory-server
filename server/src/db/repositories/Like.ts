import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Like} from 'db/models/Like'

export interface LikeRepositoryInterface extends BaseRepositoryInterface<Like> {
}

@Injectable()
export class LikeRepository extends BaseRepository<Like> {
    constructor() {
        super(Like)
    }
}