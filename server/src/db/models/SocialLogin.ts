import {appConstants} from 'constants/appConstants'
import {User} from 'db/models/User'
import {Table, Column, Model, ForeignKey, DataType} from 'sequelize-typescript'

@Table
export class SocialLogin extends Model<SocialLogin> {
    @ForeignKey(() => User)
    @Column
    userId: number

    @Column
    socialId: string

    @Column(DataType.ENUM(appConstants.socialLoginProviders.FACEBOOK, appConstants.socialLoginProviders.GOOGLE))
    provider: string
}