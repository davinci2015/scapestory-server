import {Table, Column, Model, Default, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {Brand} from './Brand'

@Table
export class Additive extends Model<Additive> {
    @Default(false)
    @Column
    predefined: boolean

    @ForeignKey(() => Brand)
    @Column
    brandId: number

    @BelongsTo(() => Brand)
    brand: Brand

    @Column
    name: string

    @Column
    description: string

    @Column
    image: string
}
