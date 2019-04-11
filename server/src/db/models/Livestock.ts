import {Table, Column, Model, BelongsToMany, Default} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeLivestock} from 'db/models/manyToMany/AquascapeLivestock'

@Table
export class Livestock extends Model<Livestock> {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @Column
    description: string

    @Column
    image: string

    @BelongsToMany(() => Aquascape, () => AquascapeLivestock)
    usedInAquascapes: Aquascape[]
}