import {Injectable} from '@graphql-modules/di'
import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Includeable} from 'sequelize/types'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {Pagination} from 'interfaces'
import * as Bluebird from 'bluebird'

export interface AquascapeFilter {
    trending: boolean
    userId: number
}

export interface AquascapeRepositoryInterface extends BaseRepositoryInterface<Aquascape> {
    getAquascapes: (pagination: Pagination, filter?: AquascapeFilter, include?: Includeable[]) => Bluebird<Aquascape[]>

    getFeaturedAquascape: (include?: Includeable[]) => Bluebird<Aquascape>

    getAquascapeById: (id: number, include?: Includeable[]) => Bluebird<Aquascape | null>

    getAquascapeImages: (aquascapeId: number) => Bluebird<AquascapeImage[]>
}

@Injectable()
export class AquascapeRepository extends BaseRepository<Aquascape> {
    constructor() {
        super(Aquascape)
    }

    async getAquascapes(pagination: Pagination, filter?: AquascapeFilter, include?: Includeable[]) {
        const where = filter ? {
            trending: filter.trending,
            userId: filter.userId
        } : undefined

        return this.findAll({
            where,
            include,
            order: [['createdAt', 'DESC']],
            limit: pagination.limit,
            offset: pagination.offset
        })
    }

    getFeaturedAquascape(include?: Includeable[]) {
        return this.findOne({where: {featured: true}, include})
    }

    getAquascapeById(id: number, include?: Includeable[]) {
        return this.findOne({where: {id}, include})
    }

    getAquascapeImages(aquascapeId: number) {
        return AquascapeImage.findAll({where: {aquascapeId}})
    }
}