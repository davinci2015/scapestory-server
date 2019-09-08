import {Filter} from 'db/models/Filter'
import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'

@Table
export class AquascapeFilter extends Model<AquascapeFilter> {
    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => Filter)
    @Column
    filterId: number
}