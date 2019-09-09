import {Injectable, Inject} from '@graphql-modules/di'

import {tokens} from 'di/tokens'
import {BrandRepositoryInterface} from 'db/repositories/Brand'
import {Brand} from 'db/models/Brand'

export interface BrandProviderInterface {
    getBrandById: (id: number) => Promise<Brand>
}

@Injectable()
export class BrandProvider implements BrandProviderInterface {
    constructor(
        @Inject(tokens.BRAND_REPOSITORY) private brandRepository: BrandRepositoryInterface
    ) {
    }

    async getBrandById(id: number) {
        return await this.brandRepository.getBrandById(id)
    }
}