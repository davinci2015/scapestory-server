import {Injectable, Inject} from '@graphql-modules/di'
import Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {BrandRepositoryInterface} from 'db/repositories/Brand'
import {Brand} from 'db/models/Brand'

export interface BrandProviderInterface {
    getBrands: () => Bluebird<Brand[]>
    findBrandById: (id: number) => Promise<Brand | null>
}

@Injectable()
export class BrandProvider implements BrandProviderInterface {
    constructor(
        @Inject(tokens.BRAND_REPOSITORY)
        private brandRepository: BrandRepositoryInterface
    ) {}

    getBrands() {
        return this.brandRepository.getBrands()
    }

    findBrandById(id: number) {
        return this.brandRepository.findBrandById(id)
    }
}
