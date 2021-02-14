import {Table, Column, Model, Default} from 'sequelize-typescript'

@Table
export class Tag extends Model {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string
}
