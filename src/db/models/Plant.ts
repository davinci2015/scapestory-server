import {Table, Column, Model, Default} from 'sequelize-typescript'

@Table
export class Plant extends Model {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @Column
    image: string

    @Column
    origin: string

    @Column
    minHeight: number // Default in centimetres

    @Column
    maxHeight: number // Default in centimetres

    @Column
    position: string

    @Column
    luminosity: string

    @Column
    growthSpeed: string

    @Column
    difficulty: string

    @Column
    infoFulfilled: boolean
}
