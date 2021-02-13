import {Injectable, Inject} from 'graphql-modules'

import {BrandRepositoryInterface, BrandRepository} from 'db/repositories/Brand'
import {Brand} from 'db/models/Brand'

export interface BrandProviderInterface {
    getBrands: () => Promise<Brand[]>
    findBrandById: (id: number) => Promise<Brand | null>
}

@Injectable()
export class BrandProvider implements BrandProviderInterface {
    constructor(
        @Inject(BrandRepository)
        private brandRepository: BrandRepositoryInterface
    ) {}

    getBrands() {
        return this.brandRepository.getBrands()
    }

    findBrandById(id: number) {
        return this.brandRepository.findBrandById(id)
    }
}
