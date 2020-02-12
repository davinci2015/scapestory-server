import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {User} from './User'

@Table
export class Notification extends Model<Notification> {
    @ForeignKey(() => User)
    @Column
    creatorId: number

    @BelongsTo(() => User)
    creator: User

    @Column
    likeId: number

    @Column
    commentId: number

    @Column
    type: number
}
