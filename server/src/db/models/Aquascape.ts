import {Table, Column, Model, ForeignKey, BelongsTo, HasMany, BelongsToMany} from 'sequelize-typescript'
import {User} from 'db/models/User'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {FavoriteUserAquascape} from 'db/models/manyToMany/FavoriteUserAquascape'
import {Plant} from 'db/models/Plant'
import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'
import {Light} from 'db/models/Light'
import {CO2} from 'db/models/CO2'
import {Substrate} from 'db/models/Substrate'
import {Additives} from 'db/models/Additives'
import {Comment} from 'db/models/Comment'

@Table
export class Aquascape extends Model<Aquascape> {
    @Column
    title: string

    @Column
    volume: number

    @Column
    startedAt: Date

    @Column
    likes: number

    @Column
    votes: number

    @Column
    inContest: boolean

    @Column
    description: string

    @Column
    mainImage: string

    @HasMany(() => AquascapeImage)
    images: AquascapeImage[]

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Light)
    light: Light

    @BelongsTo(() => CO2)
    co2: CO2

    @BelongsTo(() => Substrate)
    substrate: Substrate

    @BelongsTo(() => Additives)
    additives: Additives

    @HasMany(() => Comment)
    comments: Comment[]

    @BelongsToMany(() => User, () => FavoriteUserAquascape)
    favoritedByUsers: User[]

    @BelongsToMany(() => Plant, () => AquascapePlant)
    plants: Plant[]
}