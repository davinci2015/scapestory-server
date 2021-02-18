import {Inject, Injectable, Scope} from 'graphql-modules'
import * as DataLoader from 'dataloader'

import {Brand} from 'db/models/Brand'
import {BrandRepository, BrandRepositoryInterface} from 'db/repositories/Brand'
import {BaseDataLoader} from 'db/loaders/Base'

export interface BrandDataLoaderInterface {
    findBrandById: (id: number) => Promise<Brand | null>
}

@Injectable({scope: Scope.Operation})
export class BrandDataLoader extends BaseDataLoader implements BrandDataLoaderInterface {
    brandLoader: DataLoader<number, Brand>

    constructor(@Inject(BrandRepository) private brandRepository: BrandRepositoryInterface) {
        super()
        this.brandLoader = new DataLoader(this.batchLoadBrands)
    }

    findBrandById(id: number) {
        return this.brandLoader.load(id)
    }

    private batchLoadBrands = async (ids: number[]) => {
        const brands = await this.brandRepository.findAll({where: {id: ids}})

        return this.ensureOrder({
            docs: brands,
            keys: ids,
            prop: 'id',
        })
    }
}
