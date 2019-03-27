import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {User} from 'db/models/User'

@Table
export class Comment extends Model<Comment> {
    @Column
    content: string

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User
}