import {Injectable} from '@graphql-modules/di'
import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'

export interface AquascapeFilter {
    trending: boolean
}

export interface AquascapeRepositoryInterface extends BaseRepositoryInterface<Aquascape> {
    getAquascapes: (limit?: number, filter?: AquascapeFilter) => Promise<Aquascape[]>

    getFeaturedAquascape: () => Promise<Aquascape | null>
}

@Injectable()
export class AquascapeRepository extends BaseRepository<Aquascape> {
    constructor() {
        super(Aquascape)
    }

    async getAquascapes(limit?: number, filter?: AquascapeFilter) {
        const where = filter ? { trending: filter.trending } : undefined

        return await this.findAll({
            where,
            order: [
                ['createdAt', 'DESC']
            ],
            limit
        })
    }

    async getFeaturedAquascape() {
        return await this.findOne({where: { featured: true }})
    }
}