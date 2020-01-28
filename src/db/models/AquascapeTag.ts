import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {Tag} from 'db/models/Tag'

@Table
export class AquascapeTag extends Model<AquascapeTag> {
    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number

    @ForeignKey(() => Tag)
    @Column
    tagId: number
}
