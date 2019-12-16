import {Table, Column, Model, Default} from 'sequelize-typescript'

@Table
export class Light extends Model<Light> {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    brand: string

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
