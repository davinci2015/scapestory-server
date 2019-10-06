import {Injectable} from '@graphql-modules/di'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Comment} from 'db/models/Comment'

export interface CommentRepositoryInterface extends BaseRepositoryInterface<Comment> {
}

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
    constructor() {
        super(Comment)
    }
}