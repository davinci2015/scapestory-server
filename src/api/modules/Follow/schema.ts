import {gql} from 'graphql-modules'

export default gql`
    type Follow {
        id: Int!
        followedUserId: Int!
        followerUserId: Int!
        updatedAt: String!
        createdAt: String!
    }

    type Followers {
        rows: [Follow!]!
        count: Int!
    }

    type Following {
        rows: [Follow!]!
        count: Int!
    }

    type FollowResult {
        followers: Followers!
        following: Following!
    }

    extend type User {
        follows: FollowResult!
    }

    extend type Mutation {
        followUser(userId: Int!): Follow
        unfollowUser(userId: Int!): Follow
    }
`
