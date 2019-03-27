import {Table, Column, Model, HasMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'

@Table
export class CO2 extends Model<CO2> {
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
    usedInAquascapes: Aquascape[];
}