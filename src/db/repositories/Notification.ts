import {Injectable, Inject} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Notification} from 'db/models/Notification'
import {tokens} from 'di/tokens'
import {NotificationNotifierRepositoryInterface} from './NotificationNotifier'
import logger from 'logger'

export enum NotificationType {
    LIKE,
    FOLLOW,
    COMMENT,
    REPLY,
}

export enum NotificationStatus {
    READ,
    UNREAD,
}

export interface CreateNotificationArgs {
    creatorId: number
    notifiers: number[]
    entityId?: number
    notificationType: NotificationType
}

export interface NotificationRepositoryInterface extends BaseRepositoryInterface<Notification> {
    createNotification: (options: CreateNotificationArgs) => void
}

const notificationTypeMapping = {
    [NotificationType.LIKE]: 'likeId',
    [NotificationType.COMMENT]: 'commentId',
}

@Injectable()
export class NotificationRepository extends BaseRepository<Notification>
    implements NotificationRepositoryInterface {
    constructor(
        @Inject(tokens.NOTIFICATION_NOTIFIER_REPOSITORY)
        private notifierRepository: NotificationNotifierRepositoryInterface
    ) {
        super(Notification)
    }

    async createNotification(options: CreateNotificationArgs) {
        const notificationOptions = {
            creatorId: options.creatorId,
            type: options.notificationType,
        }

        const entityId = notificationTypeMapping[options.notificationType]

        if (entityId) {
            notificationOptions[entityId] = options.entityId
        }

        try {
            const notification = await this.create(notificationOptions)

            this.notifierRepository.bulkCreate(
                options.notifiers.map(notifier => ({
                    notificationId: notification.id,
                    notifierId: notifier,
                    status: NotificationStatus.UNREAD,
                }))
            )
        } catch (error) {
            logger.error(error)
        }
    }
}
