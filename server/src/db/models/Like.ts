import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {User} from 'db/models/User'
import {AquascapeImage} from 'db/models/AquascapeImage'

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
}