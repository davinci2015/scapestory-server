import {Injectable} from 'graphql-modules'
import * as DataLoader from 'dataloader'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Brand} from 'db/models/Brand'
import {GraphQLHelper} from 'utils/GraphQLHelper'

export interface BrandRepositoryInterface extends BaseRepositoryInterface<Brand> {
    getBrands: () => Promise<Brand[]>
    findBrandById: (id: number) => Promise<Brand | null>
}

@Injectable()
export class BrandRepository extends BaseRepository<Brand> implements BrandRepositoryInterface {
    brandLoader: DataLoader<number, Brand>

    constructor() {
        super(Brand)
        this.brandLoader = new DataLoader(this.batchLoadBrands)
    }

    getBrands() {
        return this.findAll({where: {predefined: true}})
    }

    findBrandById(id: number) {
        return this.brandLoader.load(id)
    }

    private batchLoadBrands = async (ids: number[]) => {
        const brands = await this.findAll({where: {id: ids}})
        return GraphQLHelper.ensureOrder({
            docs: brands,
            keys: ids,
            prop: 'id',
        })
    }
}
