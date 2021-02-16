import {Injectable} from 'graphql-modules'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Brand} from 'db/models/Brand'

export interface BrandRepositoryInterface extends BaseRepositoryInterface<Brand> {
    getBrands: () => Promise<Brand[]>
}

@Injectable()
export class BrandRepository extends BaseRepository<Brand> implements BrandRepositoryInterface {
    constructor() {
        super(Brand)
    }

    getBrands() {
        return this.findAll({where: {predefined: true}})
    }
}
