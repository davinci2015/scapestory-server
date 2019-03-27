import {Table, Column, Model, HasMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'

@Table
export class Substrate extends Model<Substrate> {
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @HasMany(() => Aquascape)
    usedInAquascapes: Aquascape[];
}