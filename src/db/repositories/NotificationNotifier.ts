import Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'
import {Op, WhereOptions, Order} from 'sequelize'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {NotificationNotifier} from 'db/models/NotificationNotifier'
import {Notification} from 'db/models/Notification'
import {NotificationStatus, Pagination} from 'interfaces/graphql/types'

export interface NotificationNotifierRepositoryInterface
    extends BaseRepositoryInterface<NotificationNotifier> {
    getNotifications: (userId: number, pagination: Pagination) => Bluebird<NotificationNotifier[]>
    countUnreadNotifications: (userId: number) => Bluebird<number>
    readNotifications: (notifierId: number) => Bluebird<[number, NotificationNotifier[]]>
}

@Injectable()
export class NotificationNotifierRepository extends BaseRepository<NotificationNotifier>
    implements NotificationNotifierRepositoryInterface {
    constructor() {
        super(NotificationNotifier)
    }

    getNotifications(userId: number, pagination: Pagination) {
        const where: WhereOptions = {notifierId: userId}
        const include = [Notification]
        const limit = pagination.limit || 20
        const offset = pagination.offset || 0
        const order: Order = [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
        ]

        if (pagination.cursor) {
            where.createdAt = {
                [Op.lt]: new Date(Number(pagination.cursor)),
            }
        }

        return this.findAll({where, include, order, limit, offset})
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
