import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {User} from 'db/models/User'

@Table
export class Follow extends Model<Follow> {
    @ForeignKey(() => User)
    @Column
    followedUserId: number

    @ForeignKey(() => User)
    @Column
    @Column
    followerUserId: number
}