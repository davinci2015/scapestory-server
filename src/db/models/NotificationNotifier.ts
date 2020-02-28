import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {User} from './User'
import {Notification} from './Notification'

@Table
export class NotificationNotifier extends Model<NotificationNotifier> {
    @ForeignKey(() => Notification)
    @Column
    notificationId: number

    @BelongsTo(() => Notification, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
    })
    notification: Notification

    @ForeignKey(() => User)
    @Column
    notifierId: number

    @BelongsTo(() => User, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
    })
    notifier: User

    @Column
    status: string
}
