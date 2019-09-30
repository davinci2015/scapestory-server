import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class Tank extends Model<Tank> {
    @Column
    brand: string

    @Column
    model: string

    @Column
    volume: number

    @Column
    width: number

    @Column
    height: number

    @Column
    depth: number

    @Column
    glassThickness: number
}