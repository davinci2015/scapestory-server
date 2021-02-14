import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {Additive} from 'db/models/Additive'

@Table
export class AquascapeAdditive extends Model {
    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => Additive)
    @Column
    additiveId: number
}
