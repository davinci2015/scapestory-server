import * as DataLoader from 'dataloader'

import {Injectable} from '@graphql-modules/di'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Brand} from 'db/models/Brand'

export interface BrandRepositoryInterface extends BaseRepositoryInterface<Brand> {
    getBrandById(id: number): Promise<Brand>
}

@Injectable()
export class BrandRepository extends BaseRepository<Brand> {
    dataLoader: DataLoader<number, Brand>

    constructor() {
        super(Brand)
        this.dataLoader = new DataLoader(this.batchGetBrandById)
    }

    async getBrandById(id: number) {
        return await this.dataLoader.load(id)
    }

    private batchGetBrandById = async (ids: number[]) => await this.findAll({where: {id: ids}})
}