import gql from 'graphql-tag'

export const ADD_COMMENT = gql`
    mutation AddComment(
        $entity: CommentEntityType!
        $entityId: Int!
        $content: String!
        $parentCommentId: Int
    ) {
        addComment(
            entity: $entity
            entityId: $entityId
            content: $content
            parentCommentId: $parentCommentId
        ) {
            id
            content
            createdAt
            parentCommentId
        }
    }
`

export const REMOVE_COMMENT = gql`
    mutation RemoveComment($id: Int!) {
        removeComment(id: $id) {
            id
            content
            createdAt
            parentCommentId
        }
    }
`
