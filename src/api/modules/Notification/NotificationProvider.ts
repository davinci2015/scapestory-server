import {Injectable, Inject} from '@graphql-modules/di'
import Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {
    NotificationRepositoryInterface,
    CreateNotificationArgs,
    NotificationToRemove,
} from 'db/repositories/Notification'
import {NotificationNotifierRepositoryInterface} from 'db/repositories/NotificationNotifier'
import {NotificationNotifier} from 'db/models/NotificationNotifier'
import {Pagination} from 'interfaces/graphql/types'

export interface NotificationProviderInterface {
    createNotification(options: CreateNotificationArgs): void
    getNotifications(
        userId: number,
        pagination: Pagination
    ): Promise<{rows: NotificationNotifier[]; count: number}>
    countUnreadNotifications(notifierId: number): Promise<number>
    readNotifications(notifierId: number): Bluebird<[number, NotificationNotifier[]]>
    removeNotifications(notifications: NotificationToRemove[]): Promise<number>
}

@Injectable()
export class NotificationProvider implements NotificationProviderInterface {
    constructor(
        @Inject(tokens.NOTIFICATION_REPOSITORY)
        private notificationRepository: NotificationRepositoryInterface,
        @Inject(tokens.NOTIFICATION_NOTIFIER_REPOSITORY)
        private notifierRepository: NotificationNotifierRepositoryInterface
    ) {}

    createNotification(options: CreateNotificationArgs) {
        return this.notificationRepository.createNotification(options)
    }

    getNotifications(userId: number, pagination: Pagination) {
        return this.notifierRepository.getNotifications(userId, pagination)
    }

    countUnreadNotifications(notifierId: number) {
        return this.notificationRepository.countUnreadNotifications(notifierId)
    }

    readNotifications(notifierId: number) {
        return this.notifierRepository.readNotifications(notifierId)
    }

    removeNotifications(notifications: NotificationToRemove[]) {
        return this.notificationRepository.removeNotifications(notifications)
    }
}