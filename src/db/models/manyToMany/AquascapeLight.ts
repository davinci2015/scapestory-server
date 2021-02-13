import {Light} from 'db/models/Light'
import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'

@Table
export class AquascapeLight extends Model {
    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => Light)
    @Column
    lightId: number
}
