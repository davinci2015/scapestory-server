import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class Tank extends Model<Tank> {
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
