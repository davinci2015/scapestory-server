import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class EmailConfirmation extends Model {
    @Column
    email: string

    @Column
    code: string

    @Column
    expiresAt: Date
}
