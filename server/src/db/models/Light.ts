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
    width: number // milimeter (symbol: mm)

    @Column
    height: number // milimeter (symbol: mm)

    @Column
    depth: number // milimeter (symbol: mm)

    @Column
    power: number // watt (symbol: W)

    @Column
    lumenMin: number // symbol: lm

    @Column
    lumenMax: number // symbol: lm

    @Column
    kelvinMin: number // symbol: K

    @Column
    kelvinMax: number // symbol: K

    @Column
    dimmable: boolean

    @Column
    description: string

    @Column
    image: string
}