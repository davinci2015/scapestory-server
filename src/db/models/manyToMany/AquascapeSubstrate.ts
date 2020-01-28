import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {Substrate} from 'db/models/Substrate'

@Table
export class AquascapeSubstrate extends Model<AquascapeSubstrate> {
    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => Substrate)
    @Column
    substrateId: number
}
