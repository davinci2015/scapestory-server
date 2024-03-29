import {Injectable} from 'graphql-modules'
import {Includeable, Order, WhereOptions} from 'sequelize/types'
import {literal} from 'sequelize'
import {Op} from 'sequelize'

import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {Pagination} from 'interfaces/graphql/types'

export interface AquascapeRepositoryInterface extends BaseRepositoryInterface<Aquascape> {
    getAquascapes: (
        pagination: Pagination,
        userId?: number,
        random?: boolean,
        include?: Includeable[]
    ) => Promise<{rows: Aquascape[]; count: number}>

    getFeaturedAquascape: (include?: Includeable[]) => Promise<Aquascape | null>

    getTrendingAquascapes: (pagination: Pagination, include?: Includeable[]) => Promise<Aquascape[]>

    getAquascapeById: (id: number, include?: Includeable[]) => Promise<Aquascape | null>

    getAquascapesById: (ids: number[], include?: Includeable[]) => Promise<Aquascape[]>

    getAquascapeImages: (aquascapeId: number) => Promise<AquascapeImage[]>

    updateAquascapeTitle: (id: number, title: string) => Promise<[number, Aquascape[]]>

    updateAquascapeMainImage: (
        id: number,
        imagePublicId: string,
        imageUrl: string
    ) => Promise<[number, Aquascape[]]>
}

@Injectable()
export class AquascapeRepository
    extends BaseRepository<Aquascape>
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
        const limit = pagination.limit || 50
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
            limit,
            offset,
        })

        return {rows, count}
    }

    getTrendingAquascapes(pagination: Pagination, include?: Includeable[]) {
        const where: WhereOptions = {trending: true}
        const limit = pagination.limit || 20

        if (pagination.cursor) {
            where.createdAt = {
                [Op.lt]: new Date(Number(pagination.cursor)),
            }
        }

        return this.findAll({
            where,
            include,
            order: [['createdAt', 'DESC']],
            limit,
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
