import {Table, Column, Model, BelongsToMany, Default} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeHardscape} from 'db/models/manyToMany/AquascapeHardscape'

@Table
export class Hardscape extends Model<Hardscape> {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @Column
    image: string

    @BelongsToMany(() => Aquascape, () => AquascapeHardscape)
    usedInAquascapes: Aquascape[]
}