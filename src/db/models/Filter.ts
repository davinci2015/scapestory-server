import {Table, Column, Model, Default, BelongsTo, ForeignKey} from 'sequelize-typescript'
import {Brand} from './Brand'

@Table
export class Filter extends Model {
    @Default(false)
    @Column
    predefined: boolean

    @ForeignKey(() => Brand)
    @Column
    brandId: number

    @BelongsTo(() => Brand)
    brand: Brand

    @Column
    model: string

    @Column
    description: string

    @Column
    image: string
}
