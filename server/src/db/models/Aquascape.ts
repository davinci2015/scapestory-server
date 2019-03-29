import {Table, Column, Model, ForeignKey, BelongsTo, HasMany, BelongsToMany} from 'sequelize-typescript'
import {User} from 'db/models/User'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {FavoriteUserAquascape} from 'db/models/manyToMany/FavoriteUserAquascape'
import {AquascapeHardscape} from 'db/models/manyToMany/AquascapeHardscape'
import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'
import {AquascapeSubstrate} from 'db/models/manyToMany/AquascapeSubstrate'
import {AquascapeAdditive} from 'db/models/manyToMany/AquascapeAdditive'
import {AquascapeTag} from 'db/models/manyToMany/AquascapeTag'
import {Plant} from 'db/models/Plant'
import {Light} from 'db/models/Light'
import {CO2} from 'db/models/CO2'
import {Substrate} from 'db/models/Substrate'
import {Additive} from 'db/models/Additive'
import {Comment} from 'db/models/Comment'
import {Tag} from 'db/models/Tag'
import {Hardscape} from 'db/models/Hardscape'

@Table
export class Aquascape extends Model<Aquascape> {
    @Column
    title: string

    @Column
    volume: number // Default in litres

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

    @ForeignKey(() => Light)
    @Column
    lightId: number

    @BelongsTo(() => Light)
    light: Light

    @ForeignKey(() => CO2)
    @Column
    co2Id: number

    @BelongsTo(() => CO2)
    co2: CO2

    @BelongsToMany(() => Substrate, () => AquascapeSubstrate)
    substrates: Substrate[]

    @BelongsToMany(() => Additive, () => AquascapeAdditive)
    additives: Additive[]

    @BelongsToMany(() => Hardscape, () => AquascapeHardscape)
    hardscapes: Hardscape[]

    @HasMany(() => Comment)
    comments: Comment[]

    @BelongsToMany(() => Tag, () => AquascapeTag)
    tags: Tag[]

    @BelongsToMany(() => User, () => FavoriteUserAquascape)
    favoritedByUsers: User[]

    @BelongsToMany(() => Plant, () => AquascapePlant)
    plants: Plant[]
}