import {Table, Column, Model, BelongsToMany} from 'sequelize-typescript'
import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'
import {Aquascape} from 'db/models/Aquascape'

@Table
export class Plant extends Model<Plant> {
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @Column
    image: string

    @Column
    origin: string

    @Column
    minHeight: number

    @Column
    maxHeight: number

    @Column
    position: string

    @Column
    luminosity: string

    @Column
    growthSpeed: string

    @Column
    difficulty: string

    @BelongsToMany(() => Aquascape, () => AquascapePlant)
    usedInAquascapes: Aquascape[]
}