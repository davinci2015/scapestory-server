import Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Brand} from 'db/models/Brand'

export interface BrandRepositoryInterface extends BaseRepositoryInterface<Brand> {
    getBrands: () => Bluebird<Brand[]>
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
