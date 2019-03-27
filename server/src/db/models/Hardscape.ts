import {Table, Column, Model, BelongsToMany} from 'sequelize-typescript'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeLivestock} from 'db/models/manyToMany/AquascapeLivestock'

@Table
export class Hardscape extends Model<Hardscape> {
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