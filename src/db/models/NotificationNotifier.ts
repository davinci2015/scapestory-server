import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {User} from './User'
import {Notification} from './Notification'

@Table
export class NotificationNotifier extends Model<NotificationNotifier> {
    @ForeignKey(() => Notification)
    @Column
    notificationId: number

    @BelongsTo(() => Notification)
    notification: Notification

    @ForeignKey(() => User)
    @Column
    notifierId: number

    @BelongsTo(() => User)
    notifier: User

    @Column
    status: number
}
