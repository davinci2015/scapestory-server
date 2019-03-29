import {Table, Column, Model, BelongsToMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeSubstrate} from 'db/models/manyToMany/AquascapeSubstrate'

@Table
export class Substrate extends Model<Substrate> {
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @BelongsToMany(() => Aquascape, () => AquascapeSubstrate)
    usedInAquascapes: Aquascape[]
}