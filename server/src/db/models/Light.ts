import {Table, Column, Model, HasMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'

@Table
export class Light extends Model<Light> {
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @Column
    image: string

    @Column
    turnedOnAt: string

    @Column
    turnedOffAt: string

    @HasMany(() => Aquascape)
    usedInAquascapes: Aquascape[];
}