import gql from 'graphql-tag'

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

export const FOLLOW = gql`
    mutation followUser($userId: Int!) {
        followUser(userId: $userId) {
            id
        }
    }
`

export const UNFOLLOW = gql`
    mutation unfollowUser($userId: Int!) {
        unfollowUser(userId: $userId) {
            id
        }
    }
`

export const VISIT = gql`
    mutation visitAquascape($aquascapeId: Int!) {
        visitAquascape(aquascapeId: $aquascapeId) {
            visitor {
                id
                visitorId
            }
            created
        }
    }
`

export const UPLOAD_USER_IMAGE = gql`
    mutation uploadUserImage($file: Upload!, $imageVariant: ImageVariant!) {
        uploadUserImage(file: $file, imageVariant: $imageVariant) {
            imageUrl
            imagePublicId
        }
    }
`

export const CREATE_AQUASCAPE = gql`
    mutation createAquascape {
        createAquascape {
            id
        }
    }
`
