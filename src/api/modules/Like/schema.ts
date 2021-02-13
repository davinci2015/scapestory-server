import {gql} from 'graphql-modules'

export default gql`
    type Like {
        id: Int!
        userId: Int!
        aquascapeImageId: Int
        aquascapeId: Int
        commentId: Int
    }

    type Likes {
        rows: [Like!]!
        count: Int!
    }

    extend type Aquascape {
        likesCount: Int!
        likes(limit: Int): Likes!
    }

    extend type Notification {
        like: Like
    }

    enum LikeEntityType {
        AQUASCAPE
        IMAGE
        COMMENT
    }

    extend type Mutation {
        like(aquascapeId: Int!, entity: LikeEntityType!, entityId: Int!): Like
        dislike(entity: LikeEntityType!, entityId: Int!): Like
    }
`
