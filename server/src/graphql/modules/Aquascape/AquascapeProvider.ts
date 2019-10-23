import {Injectable, Inject} from '@graphql-modules/di'
import {Includeable} from 'sequelize/types'
import * as uuid from 'uuid/v4'
import * as Bluebird from 'bluebird'

import {AquascapeRepositoryInterface} from 'db/repositories/Aquascape'
import {VisitorRepositoryInterface} from 'db/repositories/Visitor'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {tokens} from 'di/tokens'
import {Pagination} from 'interfaces'

import {CreateAquascapeArgs} from './resolvers'

export interface AquascapeProviderInterface {
    getAquascapes: (pagination: Pagination, userId?: number, include?: Includeable[]) => Bluebird<Aquascape[]>

    getFeaturedAquascape: (include?: Includeable[]) => Bluebird<Aquascape | null>

    getTrendingAquascapes: (pagination: Pagination, include?: Includeable[]) => Bluebird<Aquascape>

    getAquascapeById: (id: number, include?: Includeable[]) => Bluebird<Aquascape | null>

    createAquascape: (userId: number, data: CreateAquascapeArgs) => Promise<Aquascape>

    visitAquascape: (aquascapeId: number, userId?: number) => Promise<string | number>,

    getAquascapeImages: (aquascapeId: number) => Bluebird<AquascapeImage[]>
}

@Injectable()
export class AquascapeProvider implements AquascapeProviderInterface {
    constructor(
        @Inject(tokens.AQUASCAPE_REPOSITORY) private aquascapeRepository: AquascapeRepositoryInterface,
        @Inject(tokens.VISITOR_REPOSITORY) private visitorRepository: VisitorRepositoryInterface,
    ) {
    }

    getAquascapes(pagination: Pagination, userId?: number, include?: Includeable[]) {
        return this.aquascapeRepository.getAquascapes(pagination, userId, include)
    }

    getFeaturedAquascape(include?: Includeable[]) {
        return this.aquascapeRepository.getFeaturedAquascape(include)
    }

    getTrendingAquascapes(pagination: Pagination, include?: Includeable[]) {
        return this.aquascapeRepository.getTrendingAquascapes(pagination, include)
    }

    getAquascapeById(id: number, include?: Includeable[]) {
        return this.aquascapeRepository.getAquascapeById(id, include)
    }

    async createAquascape(userId: number, data: CreateAquascapeArgs) {
        return this.aquascapeRepository.create({userId, ...data})
    }

    async visitAquascape(aquascapeId: number, userId?: number) {
        const visitorId = userId || uuid()
        await this.visitorRepository.addVisitor(aquascapeId, visitorId.toString())

        return visitorId
    }

    getAquascapeImages(aquascapeId: number) {
        return this.aquascapeRepository.getAquascapeImages(aquascapeId)
    }
}