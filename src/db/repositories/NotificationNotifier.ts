import Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {NotificationNotifier} from 'db/models/NotificationNotifier'
import {Notification} from 'db/models/Notification'
import {NotificationStatus} from './Notification'

export interface NotificationNotifierRepositoryInterface
    extends BaseRepositoryInterface<NotificationNotifier> {
    getNotifications: (userId: number) => Bluebird<NotificationNotifier[]>
    countUnreadNotifications: (userId: number) => Bluebird<number>
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
        return this.count({where: {notifierId: userId, status: NotificationStatus.UNREAD}})
    }
}
