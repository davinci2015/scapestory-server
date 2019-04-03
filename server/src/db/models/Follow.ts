import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {User} from 'db/models/User'

@Table
export class Follow extends Model<Follow> {
    @ForeignKey(() => User)
    @Column
    followedUserId: number

    @BelongsTo(() => User, 'followedUserId')
    followed: User

    @ForeignKey(() => User)
    @Column
    followerUserId: number

    @BelongsTo(() => User, 'followerUserId')
    follower: User
}