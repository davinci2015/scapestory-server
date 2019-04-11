import {Table, Column, Model, HasMany, Default} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'

@Table
export class CO2 extends Model<CO2> {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    turnedOnAt: string

    @Column
    turnedOffAt: string

    @Column
    bps: number

    @HasMany(() => Aquascape)
    usedInAquascapes: Aquascape[]
}