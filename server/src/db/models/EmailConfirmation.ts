import {Table, Column, Model} from 'sequelize-typescript'

@Table
export class EmailConfirmation extends Model<EmailConfirmation> {
    @Column
    userId: number

    @Column
    confirmationKey: boolean

    @Column
    expiresAt: Date
}
