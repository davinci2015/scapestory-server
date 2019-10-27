import gql from 'graphql-tag'

export const LIKE = gql`
    mutation like($entity: LikeEntityType!, $entityId: Int!) {
        like(entity: $entity, entityId: $entityId) {
            id
        }
    }
`

export const DISLIKE = gql`
    mutation dislike($entity: LikeEntityType!, $entityId: Int!) {
        dislike(entity: $entity, entityId: $entityId) {
            id
        } 
    }
`