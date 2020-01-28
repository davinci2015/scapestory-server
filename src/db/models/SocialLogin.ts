import socialProviders from 'constants/socialProviders'
import {User} from 'db/models/User'
import {Table, Column, Model, ForeignKey, DataType} from 'sequelize-typescript'

@Table({paranoid: true})
export class SocialLogin extends Model<SocialLogin> {
    @ForeignKey(() => User)
    @Column
    userId: number

    @Column
    socialId: string

    @Column(DataType.ENUM(socialProviders.FACEBOOK, socialProviders.GOOGLE))
    provider: string
}
