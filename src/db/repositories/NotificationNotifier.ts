import Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'
import {Op, WhereOptions, Order} from 'sequelize'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {NotificationNotifier} from 'db/models/NotificationNotifier'
import {Notification} from 'db/models/Notification'
import {NotificationStatus, Pagination} from 'interfaces/graphql/types'

export interface NotificationNotifierRepositoryInterface
    extends BaseRepositoryInterface<NotificationNotifier> {
    getNotifications: (
        userId: number,
        pagination: Pagination
    ) => Promise<{rows: NotificationNotifier[]; count: number}>
    countUnreadNotifications: (userId: number) => Bluebird<number>
    readNotifications: (notifierId: number) => Bluebird<[number, NotificationNotifier[]]>
}

@Injectable()
export class NotificationNotifierRepository extends BaseRepository<NotificationNotifier>
    implements NotificationNotifierRepositoryInterface {
    constructor() {
        super(NotificationNotifier)
    }

    async getNotifications(userId: number, pagination: Pagination) {
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

        const [rows, count] = await Promise.all([
            this.findAll({where, include, order, limit, offset}),
            this.count({where}),
        ])

        return {rows, count}
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
