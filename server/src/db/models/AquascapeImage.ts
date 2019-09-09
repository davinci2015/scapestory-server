import {Table, Column, Model, ForeignKey, HasMany, Default} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {Comment} from 'db/models/Comment'
import {Like} from 'db/models/Like'

@Table
export class AquascapeImage extends Model<AquascapeImage> {
    @Default(false)
    @Column
    mainImage: boolean

    @Column
    title: string

    @Column
    description: string

    @Column
    url: string

    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @HasMany(() => Comment)
    comments: Comment[]

    @HasMany(() => Like)
    likes: Like[]
}