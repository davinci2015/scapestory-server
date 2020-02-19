import Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {NotificationNotifier} from 'db/models/NotificationNotifier'
import {Notification} from 'db/models/Notification'
import {NotificationStatus} from 'interfaces/graphql/types'

export interface NotificationNotifierRepositoryInterface
    extends BaseRepositoryInterface<NotificationNotifier> {
    getNotifications: (userId: number) => Bluebird<NotificationNotifier[]>
    countUnreadNotifications: (userId: number) => Bluebird<number>
    readNotifications: (notifierId: number) => Bluebird<[number, NotificationNotifier[]]>
}

@Injectable()
export class NotificationNotifierRepository extends BaseRepository<NotificationNotifier>
    implements NotificationNotifierRepositoryInterface {
    constructor() {
        super(NotificationNotifier)
    }

    getNotifications(userId: number) {
        return this.findAll({where: {notifierId: userId}, include: [Notification]})
    }

    countUnreadNotifications(userId: number) {
        return this.count({where: {notifierId: userId, status: NotificationStatus.Unread}})
    }

    readNotifications(notifierId: number) {
        return this.update(
            {status: NotificationStatus.Read},
            {where: {notifierId, status: NotificationStatus.Unread}}
        )
    }
}
