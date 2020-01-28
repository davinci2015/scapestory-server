import {Table, Column, Model, Unique, HasMany, Default, DataType} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {SocialLogin} from 'db/models/SocialLogin'
import {Follow} from 'db/models/Follow'
import {Like} from 'db/models/Like'

@Table({paranoid: true})
export class User extends Model<User> {
    @Column
    email: string

    @Column
    password: string

    @Default(false)
    @Column
    emailConfirmed: boolean

    @Unique
    @Column
    slug: string

    @Column
    name: string

    @Column({type: DataType.STRING(500)})
    about: string

    @Column
    profileImage: string

    @Column
    profileImagePublicId: string

    @Column
    coverImage: string

    @Column
    coverImagePublicId: string

    @Column
    country: string

    @Column({type: DataType.TEXT})
    facebookUrl: string

    @Column({type: DataType.TEXT})
    youtubeUrl: string

    @Column({type: DataType.TEXT})
    instagramUrl: string

    @Column({type: DataType.TEXT})
    twitterUrl: string

    @HasMany(() => SocialLogin)
    social: SocialLogin[]

    @HasMany(() => Aquascape)
    aquascapes: Aquascape[]

    @HasMany(() => Like)
    likes: Like[]

    @HasMany(() => Follow, 'followerUserId')
    following: Follow[]

    @HasMany(() => Follow, 'followedUserId')
    followers: Follow[]
}
