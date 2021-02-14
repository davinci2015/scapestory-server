import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class CO2 extends Model {
    @Column
    type: string

    @Column
    bps: number
}
