import {gql} from 'graphql-modules'

export default gql`
    type Comment {
        id: Int!
        createdAt: String!
        content: String!
        parentCommentId: Int
        likes: [Like!]!
        aquascapeImageId: Int
        aquascapeId: Int
        commentId: Int
    }

    extend type Aquascape {
        comments: [Comment!]!
    }

    extend type Like {
        comment: Comment
    }

    extend type Notification {
        comment: Comment
    }

    enum CommentEntityType {
        AQUASCAPE
        IMAGE
    }

    extend type Query {
        comments(entity: CommentEntityType!, entityId: Int!, pagination: Pagination!): [Comment!]!
    }

    extend type Mutation {
        addComment(
            aquascapeId: Int!
            entity: CommentEntityType!
            entityId: Int!
            content: String!
            parentCommentId: Int
        ): Comment
        removeComment(id: Int!): Comment
    }
`
