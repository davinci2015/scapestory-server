import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {Hardscape} from 'db/models/Hardscape'

@Table
export class AquascapeHardscape extends Model {
    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => Hardscape)
    @Column
    hardscapeId: number
}
