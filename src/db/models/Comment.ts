import {Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType} from 'sequelize-typescript'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {Aquascape} from 'db/models/Aquascape'
import {User} from 'db/models/User'
import {Like} from 'db/models/Like'

@Table({paranoid: true})
export class Comment extends Model<Comment> {
    @Column(DataType.TEXT)
    content: string

    @ForeignKey(() => Comment)
    @Column
    parentCommentId: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => Like, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    likes: Like[]

    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => AquascapeImage)
    @Column
    aquascapeImageId: number
}
