import {Injectable, Inject} from '@graphql-modules/di'
import {Includeable} from 'sequelize/types'
import * as Bluebird from 'bluebird'

import {Comment} from 'db/models/Comment'
import {tokens} from 'di/tokens'
import {
    CommentRepositoryInterface,
    AddCommentArgs,
    CommentEntityType,
} from 'db/repositories/Comment'

export interface CommentProviderInterface {
    getComments(
        entityType: CommentEntityType,
        entityId: number,
        include?: Includeable[]
    ): Bluebird<Comment[]>

    addComment(data: AddCommentArgs): Bluebird<Comment>

    removeComment(id: number, userId: number): Bluebird<Comment>
}

@Injectable()
export class CommentProvider implements CommentProviderInterface {
    constructor(
        @Inject(tokens.COMMENT_REPOSITORY)
        private commentRepository: CommentRepositoryInterface
    ) {}

    getComments(
        entityType: CommentEntityType,
        entityId: number,
        include?: Includeable[]
    ) {
        return this.commentRepository.getComments(entityType, entityId, include)
    }

    addComment(data: AddCommentArgs) {
        return this.commentRepository.addComment(data)
    }

    removeComment(id: number, userId: number) {
        return this.commentRepository.removeComment(id, userId)
    }
}
