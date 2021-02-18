import {Table, Column, Model, Default, ForeignKey, BelongsTo} from 'sequelize-typescript'
import {Brand} from './Brand'

@Table
export class Light extends Model {
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
    width: number // Milimeter (symbol: mm)

    @Column
    height: number // Milimeter (symbol: mm)

    @Column
    depth: number // Milimeter (symbol: mm)

    @Column
    power: number // Watt (symbol: W)

    @Column
    lumenMin: number // Symbol: lm

    @Column
    lumenMax: number // Symbol: lm

    @Column
    kelvinMin: number // Symbol: K

    @Column
    kelvinMax: number // Symbol: K

    @Column
    dimmable: boolean

    @Column
    description: string

    @Column
    image: string
}
