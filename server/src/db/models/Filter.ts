import {Table, Column, Model, Default} from 'sequelize-typescript'

@Table
export class Filter extends Model<Filter> {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @Column
    image: string
}