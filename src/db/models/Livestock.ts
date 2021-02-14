import {Table, Column, Model, Default} from 'sequelize-typescript'

@Table
export class Livestock extends Model {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    taxonomy: string

    @Column
    description: string

    @Column
    image: string
}
