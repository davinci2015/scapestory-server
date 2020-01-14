import {Injectable, Inject} from '@graphql-modules/di'
import Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {BrandRepositoryInterface} from 'db/repositories/Brand'
import {Brand} from 'db/models/Brand'

export interface BrandProviderInterface {
    getBrands: () => Bluebird<Brand[]>
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
}
