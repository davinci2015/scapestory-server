import {Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {User} from 'db/models/User'

@Table
export class FavoriteAquascape extends Model<FavoriteAquascape> {
    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Aquascape)
    @Column
    aquascapeId: number
}