import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    HasMany,
    BelongsToMany,
    Default
} from 'sequelize-typescript'
import {User} from 'db/models/User'
import {AquascapeLight} from 'db/models/manyToMany/AquascapeLight'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {FavoriteAquascape} from 'db/models/manyToMany/FavoriteAquascape'
import {AquascapeHardscape} from 'db/models/manyToMany/AquascapeHardscape'
import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'
import {AquascapeSubstrate} from 'db/models/manyToMany/AquascapeSubstrate'
import {AquascapeAdditive} from 'db/models/manyToMany/AquascapeAdditive'
import {AquascapeFilter} from 'db/models/manyToMany/AquascapeFilter'
import {AquascapeLivestock} from 'db/models/manyToMany/AquascapeLivestock'
import {AquascapeTag} from 'db/models/AquascapeTag'
import {Plant} from 'db/models/Plant'
import {Light} from 'db/models/Light'
import {Substrate} from 'db/models/Substrate'
import {Additive} from 'db/models/Additive'
import {Comment} from 'db/models/Comment'
import {Tag} from 'db/models/Tag'
import {Hardscape} from 'db/models/Hardscape'
import {Visitor} from 'db/models/Visitor'
import {Like} from 'db/models/Like'
import {CO2} from 'db/models/CO2'
import {Filter} from 'db/models/Filter'
import {Livestock} from 'db/models/Livestock'

@Table
export class Aquascape extends Model<Aquascape> {
    @Column
    title: string

    @Column
    volume: number // Default in litres

    @Column
    startedAt: Date

    @Default(false)
    @Column
    featured: boolean

    @Default(false)
    @Column
    trending: boolean

    @Column
    description: string

    @Column
    mainImage: string

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => CO2)
    @Column
    co2Id: number

    @BelongsTo(() => CO2)
    co2: CO2

    @Default(8)
    @Column
    photoperiod: number

    @HasMany(() => AquascapeImage)
    images: AquascapeImage[]

    @HasMany(() => Visitor)
    visitors: Visitor[]

    @HasMany(() => Comment)
    comments: Comment[]

    @HasMany(() => Like)
    likes: Like[]

    @BelongsToMany(() => Filter, () => AquascapeFilter)
    filters: Filter[]

    @BelongsToMany(() => Light, () => AquascapeLight)
    lights: Light[]

    @BelongsToMany(() => Substrate, () => AquascapeSubstrate)
    substrates: Substrate[]

    @BelongsToMany(() => Additive, () => AquascapeAdditive)
    additives: Additive[]

    @BelongsToMany(() => Hardscape, () => AquascapeHardscape)
    hardscape: Hardscape[]

    @BelongsToMany(() => Tag, () => AquascapeTag)
    tags: Tag[]

    @BelongsToMany(() => User, () => FavoriteAquascape)
    favorites: User[]

    @BelongsToMany(() => Plant, () => AquascapePlant)
    plants: Plant[]

    @BelongsToMany(() => Livestock, () => AquascapeLivestock)
    livestock: Livestock[]
}