import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {User} from 'db/models/User'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeImage} from 'db/models/AquascapeImage'

@Table
export class Comment extends Model<Comment> {
    @Column
    content: string

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => AquascapeImage)
    @Column
    aquascapeImageId: number
}