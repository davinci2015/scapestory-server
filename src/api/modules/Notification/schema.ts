import {gql} from 'graphql-modules'

export default gql`
    enum NotificationType {
        LIKE
        FOLLOW
        COMMENT
        REPLY
    }

    enum NotificationStatus {
        READ
        UNREAD
    }

    type Notification {
        id: Int!
        type: NotificationType!
        createdAt: Int!
    }

    type Notifier {
        id: Int!
        notification: Notification!
        status: NotificationStatus!
        createdAt: String!
    }

    type NotificationsResult {
        rows: [Notifier!]!
        count: Int!
    }

    extend type Query {
        notifications(pagination: Pagination!): NotificationsResult!
        unreadNotificationsCount: Int!
    }

    extend type Mutation {
        readNotifications(notifierId: Int!): Int
    }
`
