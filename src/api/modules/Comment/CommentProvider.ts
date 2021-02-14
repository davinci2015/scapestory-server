import {Injectable, Inject} from 'graphql-modules'
import {Includeable} from 'sequelize/types'

import {Comment} from 'db/models/Comment'
import {
    CommentRepositoryInterface,
    AddCommentArgs,
    CommentRepository,
} from 'db/repositories/Comment'
import {CommentEntityType} from 'interfaces/graphql/types'

export interface CommentProviderInterface {
    getCommentById(id: number): Promise<Comment | null>
    getChildComments(parentCommentId: number): Promise<Comment[]>
    getComments(
        entityType: CommentEntityType,
        entityId: number,
        include?: Includeable[]
    ): Promise<Comment[]>

    addComment(data: AddCommentArgs): Promise<Comment>

    removeComment(id: number, userId: number): Promise<Comment>
}

@Injectable()
export class CommentProvider implements CommentProviderInterface {
    constructor(
        @Inject(CommentRepository)
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
