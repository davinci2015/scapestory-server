import {Table, Column, Model, Default} from 'sequelize-typescript'

@Table
export class Substrate extends Model<Substrate> {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string
}