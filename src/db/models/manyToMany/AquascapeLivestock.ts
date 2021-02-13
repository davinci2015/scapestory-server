import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {Livestock} from 'db/models/Livestock'

@Table
export class AquascapeLivestock extends Model {
    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => Livestock)
    @Column
    livestockId: number
}
