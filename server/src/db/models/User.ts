import {Table, Column, Model, Unique, HasMany, BelongsToMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {FavoriteUserAquascape} from 'db/models/FavoriteUserAquascape'
import {Follow} from 'db/models/Follow'

@Table
export class User extends Model<User> {
    @Column
    email: string

    @Column
    password: string

    @Unique
    @Column
    username: string

    @Column
    name: string

    @Column
    profileImage: string

    @Column
    country: string

    @Column
    youtubeLink: string

    @Column
    instagramLink: string

    @HasMany(() => Aquascape)
    aquascapes: Aquascape[]

    @HasMany(() => Follow, 'followerUserId')
    following: User[]

    @HasMany(() => Follow, 'followedUserId')
    followers: User[]

    @BelongsToMany(() => Aquascape, () => FavoriteUserAquascape)
    favoriteAquascapes: Aquascape[]
}