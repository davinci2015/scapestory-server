import {Injectable} from '@graphql-modules/di'
import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Includeable} from 'sequelize/types'

export interface AquascapeFilter {
    trending: boolean
}

export interface AquascapeRepositoryInterface extends BaseRepositoryInterface<Aquascape> {
    getAquascapes: (limit?: number, filter?: AquascapeFilter, include?: Includeable[]) => Promise<Aquascape[]>

    getFeaturedAquascape: (include?: Includeable[]) => Promise<Aquascape | null>
}

@Injectable()
export class AquascapeRepository extends BaseRepository<Aquascape> {
    constructor() {
        super(Aquascape)
    }

    async getAquascapes(limit?: number, filter?: AquascapeFilter, include?: Includeable[]) {
        const where = filter ? {trending: filter.trending} : undefined

        return await this.findAll({
            where,
            order: [
                ['createdAt', 'DESC']
            ],
            limit,
            include
        })
    }

    async getFeaturedAquascape(include?: Includeable[]) {
        return await this.findOne({where: {featured: true}, include})
    }
}