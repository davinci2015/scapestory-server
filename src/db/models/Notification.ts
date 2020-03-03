import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {User} from './User'
import {Like} from './Like'
import {Comment} from './Comment'
import {Follow} from './Follow'

@Table
export class Notification extends Model<Notification> {
    @ForeignKey(() => User)
    @Column
    creatorId: number

    @BelongsTo(() => User, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
    })
    creator: User

    @ForeignKey(() => Like)
    @Column
    likeId: number

    @BelongsTo(() => Like, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
    })
    like: Like

    @ForeignKey(() => Comment)
    @Column
    commentId: number

    @BelongsTo(() => Comment, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
    })
    comment: Comment

    @ForeignKey(() => Follow)
    @Column
    followId: number

    @BelongsTo(() => Follow, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
    })
    Follow: Follow

    @Column
    type: string
}
