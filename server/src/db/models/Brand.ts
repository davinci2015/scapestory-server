import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class Brand extends Model<Brand> {
    @Column
    name: string
}