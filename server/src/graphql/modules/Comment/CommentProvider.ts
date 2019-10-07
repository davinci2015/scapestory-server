import {Injectable, Inject} from '@graphql-modules/di'
import {Includeable} from 'sequelize/types'
import * as Bluebird from 'bluebird'

import {Comment} from 'db/models/Comment'
import {tokens} from 'di/tokens'
import {CommentRepositoryInterface} from 'db/repositories/Comment'

export interface AddCommentArgs {
    entityId: number
    userId: number
    content: string
    parentCommentId?: number
}

export interface CommentProviderInterface {
    getCommentsForAquascape(aquascapeId: number, include?: Includeable[]): Bluebird<Comment[]>

    getCommentsForAquascapeImage(imageId: number, include?: Includeable[]): Bluebird<Comment[]>

    addCommentForAquascape(data: AddCommentArgs): Bluebird<Comment>

    addCommentForAquascapeImage(data: AddCommentArgs): Bluebird<Comment>
}

@Injectable()
export class CommentProvider implements CommentProviderInterface {
    constructor(
        @Inject(tokens.COMMENT_REPOSITORY) private commentRepository: CommentRepositoryInterface
    ) {
    }

    getCommentsForAquascape(aquascapeId: number, include?: Includeable[]) {
        return this.commentRepository.findAll({where: {aquascapeId}, include})
    }

    getCommentsForAquascapeImage(aquascapeImageId: number, include?: Includeable[]) {
        return this.commentRepository.findAll({where: {aquascapeImageId}, include})
    }

    addCommentForAquascape(data: AddCommentArgs) {
        return this.commentRepository.create({
            aquascapeId: data.entityId,
            userId: data.userId,
            content: data.content,
            parentCommentId: data.parentCommentId
        })
    }

    addCommentForAquascapeImage(data: AddCommentArgs) {
        return this.commentRepository.create({
            aquascapeImageId: data.entityId,
            userId: data.userId,
            content: data.content,
            parentCommentId: data.parentCommentId
        })
    }
}