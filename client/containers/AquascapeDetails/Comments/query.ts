import gql from 'graphql-tag'
import {User, Like} from 'generated/graphql'

export interface CommentsQuery {
    comments: AquascapeComment[]
}

export interface AquascapeComment {
    id: number
    content: string
    createdAt: string
    parentCommentId?: number
    likes: Pick<Like, 'id' | 'userId'>[]
    user: Pick<User, 'id' | 'name' | 'profileImage' | 'username'>
}

export interface AddCommentMutationResult {
    addComment: AquascapeComment
}

export const COMMENTS = gql`
    query Comments($id: Int!) {
      comments(entity: AQUASCAPE, entityId: $id, pagination: {limit: 8, offset: 0}) {
        id
        content
        createdAt
        parentCommentId
        likes {
            id
            userId
        }
        user {
            id
            name
            username
            profileImage
        }
      }
    }
`

export const ADD_COMMENT = gql`
    mutation AddComment($entity: CommentEntityType!, $entityId: Int!, $content: String!, $parentCommentId: Int) {
        addComment(entity: $entity, entityId: $entityId, content: $content, parentCommentId: $parentCommentId) {
            id
            content
            createdAt
            parentCommentId
        }
    }
`