import {Table, Column, Model, Default} from 'sequelize-typescript'

@Table
export class Brand extends Model<Brand> {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    logo: string

    @Column
    website: string

    @Column
    address: string
}
