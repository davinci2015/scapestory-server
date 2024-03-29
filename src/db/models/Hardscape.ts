import {Table, Column, Model, Default} from 'sequelize-typescript'

@Table
export class Hardscape extends Model {
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
