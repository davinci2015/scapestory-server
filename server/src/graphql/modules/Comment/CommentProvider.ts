import {Injectable, Inject} from '@graphql-modules/di'
import {Includeable} from 'sequelize/types'
import * as Bluebird from 'bluebird'

import {Comment} from 'db/models/Comment'
import {tokens} from 'di/tokens'
import {CommentRepositoryInterface} from 'db/repositories/Comment'

export interface CommentProviderInterface {
    getCommentsForAquascape(aquascapeId: number, include?: Includeable[]): Bluebird<Comment[]>
    getCommentsForAquascapeImage(imageId: number, include?: Includeable[]): Bluebird<Comment[]>
    addCommentForAquascape(
        aquascapeId: number,
        userId: number,
        content: string,
        parentCommentId?: number): Bluebird<Comment>
    addCommentForAquascapeImage(
        aquascapeImageId: number,
        userId: number,
        content: string,
        parentCommentId?: number): Bluebird<Comment>
}

@Injectable()
export class CommentProvider implements CommentProviderInterface {
    constructor(
        @Inject(tokens.COMMENT_REPOSITORY) private commentRepository: CommentRepositoryInterface,
    ) {
    }

    getCommentsForAquascape(aquascapeId: number, include?: Includeable[]) {
        return this.commentRepository.findAll({where: {aquascapeId}, include})
    }

    getCommentsForAquascapeImage(aquascapeImageId: number, include?: Includeable[]) {
        return this.commentRepository.findAll({where: {aquascapeImageId}, include})
    }

    addCommentForAquascape(aquascapeId: number, userId: number, content: string, parentCommentId?: number) {
        return this.commentRepository.create({
            aquascapeId,
            userId,
            content,
            parentCommentId
        })
    }

    addCommentForAquascapeImage(aquascapeImageId: number, userId: number, content: string, parentCommentId?: number) {
        return this.commentRepository.create({
            aquascapeImageId,
            userId,
            content,
            parentCommentId
        })
    }
}