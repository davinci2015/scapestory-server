import {gql} from 'graphql-modules'

export default gql`
    type User {
        id: Int!
        slug: String!
        name: String!
        about: String
        profileImage: String
        profileImagePublicId: String
        coverImage: String
        coverImagePublicId: String
        country: String
        facebookUrl: String
        youtubeUrl: String
        instagramUrl: String
        twitterUrl: String
        createdAt: String!
        updatedAt: String!
    }

    extend type Notification {
        creator: User
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type ImageUploadResult {
        imageUrl: String!
        imagePublicId: String!
    }

    extend type Like {
        user: User!
    }

    extend type Follow {
        followed: User!
        follower: User!
    }

    extend type Aquascape {
        user: User!
    }

    extend type Comment {
        user: User!
    }

    enum ImageVariant {
        PROFILE
        COVER
    }

    input UserDetails {
        name: String
        about: String
        facebookUrl: String
        youtubeUrl: String
        instagramUrl: String
        twitterUrl: String
    }

    extend type Query {
        me: User!
        user(id: Int!): User
        userBySlug(slug: String!): User
        users: [User]!
    }

    extend type Mutation {
        uploadUserImage(file: Upload!, imageVariant: ImageVariant!): ImageUploadResult!
        updateUserDetails(details: UserDetails!): [User]
        confirmEmail(token: String!): AuthPayload
    }
`
