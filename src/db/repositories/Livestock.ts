import {Injectable} from 'graphql-modules'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Livestock} from 'db/models/Livestock'

export interface LivestockRepositoryInterface extends BaseRepositoryInterface<Livestock> {
    getLivestock: () => Promise<Livestock[]>
    findLivestockById(id: number): Promise<Livestock | null>
}

@Injectable()
export class LivestockRepository
    extends BaseRepository<Livestock>
    implements LivestockRepositoryInterface {
    constructor() {
        super(Livestock)
    }

    getLivestock() {
        return this.findAll({where: {predefined: true}})
    }

    findLivestockById(id: number) {
        return this.findOne({where: {id}})
    }
}
