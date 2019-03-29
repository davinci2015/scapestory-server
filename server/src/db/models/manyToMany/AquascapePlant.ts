import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {Plant} from 'db/models/Plant'

@Table
export class AquascapePlant extends Model<AquascapePlant> {
    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => Plant)
    @Column
    plantId: number
}