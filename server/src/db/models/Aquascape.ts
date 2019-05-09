import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    HasMany,
    BelongsToMany,
    Default,
    DefaultScope
} from 'sequelize-typescript'
import {User} from 'db/models/User'
import {AquascapeLight} from 'db/models/manyToMany/AquascapeLight'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {FavoriteUserAquascape} from 'db/models/manyToMany/FavoriteUserAquascape'
import {AquascapeHardscape} from 'db/models/manyToMany/AquascapeHardscape'
import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'
import {AquascapeSubstrate} from 'db/models/manyToMany/AquascapeSubstrate'
import {AquascapeAdditive} from 'db/models/manyToMany/AquascapeAdditive'
import {AquascapeTag} from 'db/models/manyToMany/AquascapeTag'
import {Plant} from 'db/models/Plant'
import {Light} from 'db/models/Light'
import {Substrate} from 'db/models/Substrate'
import {Additive} from 'db/models/Additive'
import {Comment} from 'db/models/Comment'
import {Tag} from 'db/models/Tag'
import {Hardscape} from 'db/models/Hardscape'

@DefaultScope({
    include: [
        {
            as: 'user',
            model: () => User
        }
    ]
})
@Table
export class Aquascape extends Model<Aquascape> {
    @Column
    title: string

    @Column
    volume: number // Default in litres

    @Column
    startedAt: Date

    @Default(0)
    @Column
    likes: number

    @Default(0)
    @Column
    votes: number

    @Default(false)
    @Column
    inContest: boolean

    @Column
    description: string

    @HasMany(() => AquascapeImage)
    images: AquascapeImage[]

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @Column
    CO2: string

    @Column
    CO2BPS: string

    @Default(8)
    @Column
    photoperiod: number

    @BelongsToMany(() => Light, () => AquascapeLight)
    lights: Light[]

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