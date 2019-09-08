import {Table, Column, Model, Default} from 'sequelize-typescript'

@Table
export class Light extends Model<Light> {
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