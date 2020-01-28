import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {Aquascape} from 'db/models/Aquascape'
import {User} from 'db/models/User'
import {Comment} from 'db/models/Comment'

@Table
export class Like extends Model<Like> {
    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => AquascapeImage)
    @Column
    aquascapeImageId: number

    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => Comment)
    @Column
    commentId: number
}
