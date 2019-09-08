import {Table, Column, Model, Default, ForeignKey, BelongsTo, DefaultScope} from 'sequelize-typescript'
import {Brand} from 'db/models/Brand'

@DefaultScope({
    include: [
        {
            as: 'brand',
            model: () => Brand
        }
    ]
})
@Table
export class Light extends Model<Light> {
    @Default(false)
    @Column
    predefined: boolean

    @Column
    name: string

    @ForeignKey(() => Brand)
    @Column
    brandId: number

    @BelongsTo(() => Brand)
    brand: Brand

    @Column
    model: string

    @Column
    description: string

    @Column
    image: string
}