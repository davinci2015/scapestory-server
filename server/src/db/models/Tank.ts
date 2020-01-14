import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {Brand} from './Brand'

@Table
export class Tank extends Model<Tank> {
    @ForeignKey(() => Brand)
    @Column
    brandId: number

    @BelongsTo(() => Brand)
    brand: Brand

    @Column
    model: string

    @Column
    volume: number // Litres

    @Column
    width: number // Milimetres

    @Column
    height: number // Milimetres

    @Column
    depth: number // Milimetres

    @Column
    glassThickness: number // Milimetres
}
