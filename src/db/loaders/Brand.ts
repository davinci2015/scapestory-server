import {Inject, Injectable, Scope} from 'graphql-modules'
import * as DataLoader from 'dataloader'

import {Brand} from 'db/models/Brand'
import {GraphQLHelper} from 'utils/GraphQLHelper'
import {BrandRepository, BrandRepositoryInterface} from 'db/repositories/Brand'

export interface BrandDataLoaderInterface {
    findBrandById: (id: number) => Promise<Brand | null>
}

@Injectable({scope: Scope.Operation})
export class BrandDataLoader implements BrandDataLoaderInterface {
    brandLoader: DataLoader<number, Brand>

    constructor(@Inject(BrandRepository) private brandRepository: BrandRepositoryInterface) {
        this.brandLoader = new DataLoader(this.batchLoadBrands)
    }

    findBrandById(id: number) {
        return this.brandLoader.load(id)
    }

    private batchLoadBrands = async (ids: number[]) => {
        const brands = await this.brandRepository.findAll({where: {id: ids}})
        return GraphQLHelper.ensureOrder({
            docs: brands,
            keys: ids,
            prop: 'id',
        })
    }
}
