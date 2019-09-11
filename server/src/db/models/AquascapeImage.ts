import {Table, Column, Model, ForeignKey, HasMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {Comment} from 'db/models/Comment'
import {Like} from 'db/models/Like'

@Table
export class AquascapeImage extends Model<AquascapeImage> {
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