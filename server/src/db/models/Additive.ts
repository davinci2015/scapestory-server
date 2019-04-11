import {Table, Column, Model, BelongsToMany, Default} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeAdditive} from 'db/models/manyToMany/AquascapeAdditive'

@Table
export class Additive extends Model<Additive> {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @BelongsToMany(() => Aquascape, () => AquascapeAdditive)
    usedInAquascapes: Aquascape[]
}