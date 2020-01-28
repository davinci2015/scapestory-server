import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    DefaultScope,
} from 'sequelize-typescript'
import {User} from 'db/models/User'

@DefaultScope({
    include: [
        {
            as: 'followed',
            model: () => User,
        },
        {
            as: 'follower',
            model: () => User,
        },
    ],
})
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
