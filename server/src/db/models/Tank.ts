import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class Tank extends Model<Tank> {
    @Column
    brand: string

    @Column
    model: string

    @Column
    volume: number // litres

    @Column
    width: number // milimetres

    @Column
    height: number // milimetres

    @Column
    depth: number // milimetres

    @Column
    glassThickness: number // milimetres
}
