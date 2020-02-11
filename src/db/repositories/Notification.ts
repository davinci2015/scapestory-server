import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Notification} from 'db/models/Notification'

export enum NotificationType {
    LIKE,
    FOLLOW,
    COMMENT,
}

export enum NotificationStatus {
    READ,
    UNREAD,
}

export interface CreateNotificationArgs {
    creatorId: number
    notifiers: number[]
    entityId: number
    notificationType: NotificationType
}

export interface NotificationRepositoryInterface extends BaseRepositoryInterface<Notification> {
    createNotification: (options: CreateNotificationArgs) => void

@Injectable()
export class NotificationRepository extends BaseRepository<Notification>
    implements NotificationRepositoryInterface {
    constructor() {
        super(Notification)
    }

    async createNotification(options: CreateNotificationArgs) {
        const notification = await this.create({
            creatorId: options.creatorId,
            type: options.notificationType,
            entityId: options.entityId,
        })

        this.bulkCreate(options.notifiers.map(notifier => ({
            notificationId: notification.id,
            notifierId: notifier,
            status: NotificationStatus.UNREAD,
        })))
    }
}
