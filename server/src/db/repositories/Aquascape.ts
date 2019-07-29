import {Injectable} from '@graphql-modules/di'
import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'

export interface AquascapeRepositoryInterface extends BaseRepositoryInterface<Aquascape> {
    getAquascapes: (limit?: number) => Promise<Aquascape[]>,

    getTrendingAquascapes: (limit?: number) => Promise<Aquascape[]>

    getNewestAquascapes: (limit?: number) => Promise<Aquascape[]>
}

@Injectable()
export class AquascapeRepository extends BaseRepository<Aquascape> {
    constructor() {
        super(Aquascape)
    }

    async getAquascapes(limit?: number) {
        return await this.findAll({limit})
    }

    async getTrendingAquascapes(limit?: number) {
        return await this.findAll({where: {trending: true}, limit})
    }

    async getNewestAquascapes(limit?: number) {
        return await this.findAll({order: ['createdAt', 'DESC'], limit})
    }
}