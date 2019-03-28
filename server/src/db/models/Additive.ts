import {Table, Column, Model, BelongsToMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeAdditive} from 'db/models/AquascapeAdditive'

@Table
export class Additive extends Model<Additive> {
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @BelongsToMany(() => Aquascape, () => AquascapeAdditive)
    usedInAquascapes: Aquascape[]
}