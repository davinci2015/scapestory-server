import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class User extends Model<User> {
    @Column
    email: string

    @Column
    password: string

    @Column
    username: string

    @Column
    name: string

    @Column
    profileImage: string

    @Column
    country: string
}