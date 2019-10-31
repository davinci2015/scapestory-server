import {Injectable} from '@graphql-modules/di'
import {Includeable, Order} from 'sequelize/types'
import {literal} from 'sequelize'
import * as Bluebird from 'bluebird'

import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {Pagination} from 'interfaces'

export interface AquascapeFilter {
    trending: boolean
}

export interface AquascapeRepositoryInterface extends BaseRepositoryInterface<Aquascape> {
    getAquascapes: (
        pagination: Pagination,
        userId?: number,
        random?: boolean,
        include?: Includeable[]
    ) => Bluebird<Aquascape[]>

    getFeaturedAquascape: (include?: Includeable[]) => Bluebird<Aquascape>

    getTrendingAquascapes: (pagination: Pagination, include?: Includeable[]) => Bluebird<Aquascape>

    getAquascapeById: (id: number, include?: Includeable[]) => Bluebird<Aquascape | null>

    getAquascapeImages: (aquascapeId: number) => Bluebird<AquascapeImage[]>
}

@Injectable()
export class AquascapeRepository extends BaseRepository<Aquascape> {
    constructor() {
        super(Aquascape)
    }

    getAquascapes(pagination: Pagination, userId?: number, random?: boolean, include?: Includeable[]) {
        const where: {[key: string]: number} = {}
        const defaultOrder: Order = [['createdAt', 'DESC']]
        const randomOrder: Order = literal('random()')

        if (userId) {
            where.userId = userId
        }

        return this.findAll({
            where,
            include,
            order: random ? randomOrder : defaultOrder,
            limit: pagination.limit,
            offset: pagination.offset
        })
    }

    async getTrendingAquascapes(pagination: Pagination, include?: Includeable[]) {
        return this.findAll({
            where: {trending: true},
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