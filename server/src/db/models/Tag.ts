import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class Tag extends Model<Tag> {
    @Column
    predefined: boolean

    @Column
    name: string
}