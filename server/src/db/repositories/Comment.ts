import {Injectable} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Comment} from 'db/models/Comment'
import {Includeable} from 'sequelize/types'

export enum CommentEntityType {
    AQUASCAPE,
    IMAGE
}

export interface AddCommentArgs {
    content: string
    userId: number
    entityType: CommentEntityType
    entityId: number
    parentCommentId?: number
}

export interface CommentRepositoryInterface extends BaseRepositoryInterface<Comment> {
    getComments(entityType: CommentEntityType, entityId: number, include?: Includeable[]): Bluebird<Comment[]>

    addComment(data: AddCommentArgs): Bluebird<Comment>
}

const entityToFieldMapper = {
    [CommentEntityType.AQUASCAPE]: 'aquascapeId',
    [CommentEntityType.IMAGE]: 'aquascapeImageId',
}

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
    constructor() {
        super(Comment)
    }

    getComments(entityType: CommentEntityType, entityId: number, include?: Includeable[]): Bluebird<Comment[]> {
        return this.findAll({
            [entityToFieldMapper[entityType]]: entityId,
            include
        })
    }

    addComment(data: AddCommentArgs) {
        return this.create({
            userId: data.userId,
            [entityToFieldMapper[data.entityId]]: data.entityId,
            content: data.content,
            parentCommentId: data.parentCommentId
        })
    }
}