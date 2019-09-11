import {Injectable} from '@graphql-modules/di'
import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Includeable} from 'sequelize/types'
import {AquascapeImage} from 'db/models/AquascapeImage'

export interface AquascapeFilter {
    trending: boolean
}

export interface AquascapeRepositoryInterface extends BaseRepositoryInterface<Aquascape> {
    getAquascapes: (limit?: number, filter?: AquascapeFilter, include?: Includeable[]) => Promise<Aquascape[]>

    getFeaturedAquascape: (include?: Includeable[]) => Promise<Aquascape | null>

    getAquascapeImages: (aquascapeId: number) => Promise<AquascapeImage[]>
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

    async getAquascapeImages(aquascapeId: number) {
        return await AquascapeImage.findAll({where: {aquascapeId}})
    }
}