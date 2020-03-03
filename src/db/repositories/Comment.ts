import {Injectable} from '@graphql-modules/di'
import {UserInputError} from 'apollo-server'
import Bluebird from 'bluebird'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Comment} from 'db/models/Comment'
import {Includeable} from 'sequelize/types'
import {CommentEntityType} from 'interfaces/graphql/types'

export interface AddCommentArgs {
    content: string
    userId: number
    entityType: CommentEntityType
    entityId: number
    parentCommentId?: number | null
}

export interface CommentRepositoryInterface extends BaseRepositoryInterface<Comment> {
    getComments(
        entityType: CommentEntityType,
        entityId: number,
        include?: Includeable[]
    ): Bluebird<Comment[]>

    getChildComments(parentCommentId: number): Bluebird<Comment[]>

    addComment(data: AddCommentArgs): Bluebird<Comment>

    removeComment(id: number, userId: number): Bluebird<Comment>
}

const entityToFieldMapper = {
    [CommentEntityType.Aquascape]: 'aquascapeId',
    [CommentEntityType.Image]: 'aquascapeImageId',
}

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
    constructor() {
        super(Comment)
    }

    getComments(
        entityType: CommentEntityType,
        entityId: number,
        include?: Includeable[]
    ): Bluebird<Comment[]> {
        const entity = entityToFieldMapper[entityType]

        return this.findAll({
            where: {[entity]: entityId},
            include,
            order: [['createdAt', 'DESC']],
        })
    }

    getChildComments(parentCommentId: number) {
        return this.findAll({where: {parentCommentId}})
    }

    addComment(data: AddCommentArgs) {
        const entity = entityToFieldMapper[data.entityType]

        return this.create({
            userId: data.userId,
            [entity]: data.entityId,
            content: data.content,
            parentCommentId: data.parentCommentId,
        })
    }

    async removeComment(id: number, userId: number) {
        const comment = await this.findOne({where: {id, userId}})

        if (!comment) {
            throw new UserInputError('Comment not found.')
        }

        await Promise.all([comment.destroy(), this.destroy({where: {parentCommentId: comment.id}})])

        return comment
    }
}
