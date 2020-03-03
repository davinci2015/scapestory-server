import {Injectable, Inject} from '@graphql-modules/di'
import {Includeable} from 'sequelize/types'
import Bluebird from 'bluebird'

import {Comment} from 'db/models/Comment'
import {tokens} from 'di/tokens'
import {CommentRepositoryInterface, AddCommentArgs} from 'db/repositories/Comment'
import {CommentEntityType} from 'interfaces/graphql/types'

export interface CommentProviderInterface {
    getCommentById(id: number): Bluebird<Comment | null>
    getChildComments(parentCommentId: number): Promise<Comment[]>
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

    getCommentById(id: number) {
        return this.commentRepository.findOne({where: {id}})
    }

    getComments(entityType: CommentEntityType, entityId: number, include?: Includeable[]) {
        return this.commentRepository.getComments(entityType, entityId, include)
    }

    getChildComments(parentCommentId: number) {
        return this.commentRepository.getChildComments(parentCommentId)
    }

    addComment(data: AddCommentArgs) {
        return this.commentRepository.addComment(data)
    }

    removeComment(id: number, userId: number) {
        return this.commentRepository.removeComment(id, userId)
    }
}
