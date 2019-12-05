import {Injectable} from '@graphql-modules/di'
import {Includeable, Order, WhereOptions} from 'sequelize/types'
import {literal} from 'sequelize'
import {Op} from 'sequelize'
import * as Bluebird from 'bluebird'

import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {Pagination} from 'graphql/generated/types'

export interface AquascapeRepositoryInterface
    extends BaseRepositoryInterface<Aquascape> {
    getAquascapes: (
        pagination: Pagination,
        userId?: number,
        random?: boolean,
        include?: Includeable[]
    ) => Promise<{rows: Aquascape[], count: number}>

    getFeaturedAquascape: (
        include?: Includeable[]
    ) => Bluebird<Aquascape | null>

    getTrendingAquascapes: (
        pagination: Pagination,
        include?: Includeable[]
    ) => Bluebird<Aquascape[]>

    getAquascapeById: (
        id: number,
        include?: Includeable[]
    ) => Bluebird<Aquascape | null>

    getAquascapeImages: (aquascapeId: number) => Bluebird<AquascapeImage[]>

    updateAquascapeTitle: (id: number, title: string) => Bluebird<[number, Aquascape[]]>
}

@Injectable()
export class AquascapeRepository extends BaseRepository<Aquascape>
    implements AquascapeRepositoryInterface {
    constructor() {
        super(Aquascape)
    }

    async getAquascapes(
        pagination: Pagination,
        userId?: number,
        random?: boolean,
        include?: Includeable[]
    ) {
        const where: WhereOptions = {}
        const defaultOrder: Order = [['createdAt', 'DESC']]
        const randomOrder: Order = literal('random()')

        if (userId) {
            where.userId = userId
        }

        const count = await this.count({where})

        if (pagination.cursor) {
            where.createdAt = {
                [Op.lt]: new Date(Number(pagination.cursor))
            }
        }

        const rows = await this.findAll({
            where,
            include,
            order: random ? randomOrder : defaultOrder,
            limit: pagination.limit
        })

        return {rows, count}
    }

    getTrendingAquascapes(pagination: Pagination, include?: Includeable[]) {
        const where: WhereOptions = { trending: true }

        if (pagination.cursor) {
            where.createdAt = {
                [Op.lt]: new Date(Number(pagination.cursor))
            }
        }

        return this.findAll({
            where,
            include,
            order: [['createdAt', 'DESC']],
            limit: pagination.limit,
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

    updateAquascapeTitle(id: number, title: string) {
        return this.update({title}, {where: {id}, returning: true})
    }
}
