import gql from 'graphql-tag'
import {Like} from 'generated/graphql'

export interface LikeMutationResult {
    like: Like
}

export interface DislikeMutationResult extends LikeMutationResult {}

export const LIKE = gql`
    mutation like($entity: LikeEntityType!, $entityId: Int!) {
        like(entity: $entity, entityId: $entityId) {
            id
            aquascapeId
            aquascapeImageId
            userId
            commentId
        }
    }
`

export const DISLIKE = gql`
    mutation dislike($entity: LikeEntityType!, $entityId: Int!) {
        dislike(entity: $entity, entityId: $entityId) {
            id
            aquascapeId
            aquascapeImageId
            userId
            commentId
        } 
    }
`