import {Table, Column, Model, BelongsToMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeHardscape} from 'db/models/AquascapeHardscape'

@Table
export class Hardscape extends Model<Hardscape> {
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