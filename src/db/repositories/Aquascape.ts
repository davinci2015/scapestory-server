import {Injectable} from '@graphql-modules/di'
import {Includeable, Order, WhereOptions} from 'sequelize/types'
import {literal} from 'sequelize'
import {Op} from 'sequelize'
import Bluebird from 'bluebird'

import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {Pagination} from 'api/generated/types'

export interface AquascapeRepositoryInterface extends BaseRepositoryInterface<Aquascape> {
    getAquascapes: (
        pagination: Pagination,
        userId?: number,
        random?: boolean,
        include?: Includeable[]
    ) => Promise<{rows: Aquascape[]; count: number}>

    getFeaturedAquascape: (include?: Includeable[]) => Bluebird<Aquascape | null>

    getTrendingAquascapes: (
        pagination: Pagination,
        include?: Includeable[]
    ) => Bluebird<Aquascape[]>

    getAquascapeById: (id: number, include?: Includeable[]) => Bluebird<Aquascape | null>

    getAquascapesById: (ids: number[], include?: Includeable[]) => Bluebird<Aquascape[]>

    getAquascapeImages: (aquascapeId: number) => Bluebird<AquascapeImage[]>

    updateAquascapeTitle: (id: number, title: string) => Bluebird<[number, Aquascape[]]>

    updateAquascapeMainImage: (
        id: number,
        imagePublicId: string,
        imageUrl: string
    ) => Bluebird<[number, Aquascape[]]>
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
        const randomOrder: Order = literal('random()')
        const offset = pagination.offset || 0
        const defaultOrder: Order = [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
        ]

        if (userId) {
            where.userId = userId
        }

        const count = await this.count({where})

        if (pagination.cursor) {
            where.createdAt = {
                [Op.lt]: new Date(Number(pagination.cursor)),
            }
        }

        const rows = await this.findAll({
            where,
            include,
            order: random ? randomOrder : defaultOrder,
            limit: pagination.limit,
            offset,
        })

        return {rows, count}
    }

    getTrendingAquascapes(pagination: Pagination, include?: Includeable[]) {
        const where: WhereOptions = {trending: true}

        if (pagination.cursor) {
            where.createdAt = {
                [Op.lt]: new Date(Number(pagination.cursor)),
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

    getAquascapesById(ids: number[], include?: Includeable[]) {
        return this.findAll({where: {id: ids}, include})
    }

    getAquascapeImages(aquascapeId: number) {
        return AquascapeImage.findAll({where: {aquascapeId}})
    }

    updateAquascapeTitle(id: number, title: string) {
        return this.update({title}, {where: {id}, returning: true})
    }

    updateAquascapeMainImage(id: number, mainImagePublicId: string, mainImageUrl: string) {
        return this.update(
            {
                mainImagePublicId,
                mainImageUrl,
            },
            {
                where: {
                    id,
                },
            }
        )
    }
}
