import {Injectable, Inject} from 'graphql-modules'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Notification} from 'db/models/Notification'
import {NotificationNotifierRepositoryInterface} from './NotificationNotifier'
import logger from 'logger'
import {NotificationType, NotificationStatus} from 'interfaces/graphql/types'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'

export interface CreateNotificationArgs {
    creatorId: number
    notifiers: number[]
    entityId?: number
    notificationType: NotificationType
}

export interface NotificationToRemove {
    entityId: number
    notificationType: NotificationType
}

export interface NotificationRepositoryInterface extends BaseRepositoryInterface<Notification> {
    createNotification: (options: CreateNotificationArgs) => void
    countUnreadNotifications(notifierId: number): Promise<number>
    removeNotifications(notifications: NotificationToRemove[]): Promise<number>
}

const notificationTypeMapping = {
    [NotificationType.Like]: 'likeId',
    [NotificationType.Comment]: 'commentId',
    [NotificationType.Reply]: 'commentId',
    [NotificationType.Follow]: 'followId',
}

@Injectable()
export class NotificationRepository
    extends BaseRepository<Notification>
    implements NotificationRepositoryInterface {
    constructor(
        @Inject(NotificationNotifierRepository)
        private notifierRepository: NotificationNotifierRepositoryInterface
    ) {
        super(Notification)
    }

    countUnreadNotifications(notifierId: number) {
        return this.notifierRepository.count({
            where: {notifierId, status: NotificationStatus.Unread},
        })
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
                    status: NotificationStatus.Unread,
                }))
            )
        } catch (error) {
            logger.error(error)
        }
    }

    removeNotifications(notifications: NotificationToRemove[]) {
        let field: string

        const where = notifications.reduce((acc, notification) => {
            field = notificationTypeMapping[notification.notificationType]
            acc[field] = acc[field] || []
            acc[field].push(notification.entityId)

            return acc
        }, {})

        return this.destroy({where})
    }
}
