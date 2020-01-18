import {Table, Column, Model, Unique, HasMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {SocialLogin} from 'db/models/SocialLogin'
import {Follow} from 'db/models/Follow'
import {Like} from 'db/models/Like'

@Table
export class User extends Model<User> {
    @Column
    email: string

    @Column
    password: string

    @Unique
    @Column
    slug: string

    @Column
    name: string

    @Column
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

    @Column
    facebookUrl: string

    @Column
    youtubeUrl: string

    @Column
    instagramUrl: string

    @Column
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
