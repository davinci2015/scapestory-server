import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'

@Table
export class Visitor extends Model<Visitor> {
    @Column
    visitorId: string

    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number
}
