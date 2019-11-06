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