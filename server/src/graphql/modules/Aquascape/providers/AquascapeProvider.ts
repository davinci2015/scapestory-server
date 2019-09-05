import {Injectable, Inject} from '@graphql-modules/di'
import * as uuid from 'uuid/v4'

import {AquascapeRepositoryInterface, AquascapeFilter} from 'db/repositories/Aquascape'
import {CreateAquascapeArgs} from 'graphql/modules/Aquascape/resolvers'
import {VisitorRepositoryInterface} from 'db/repositories/Visitor'
import {Aquascape} from 'db/models/Aquascape'
import {tokens} from 'di/tokens'
import {Pagination} from 'interfaces'

export interface AquascapeProviderInterface {
    getAquascapes: (pagination: Pagination, filter?: AquascapeFilter) => Promise<Aquascape[]>,

    getFeaturedAquascape: () => Promise<Aquascape | null>,

    createAquascape: (userId: number, data: CreateAquascapeArgs) => Promise<Aquascape>

    visitAquascape: (aquascapeId: number, userId?: string) => Promise<string>
}

@Injectable()
export class AquascapeProvider implements AquascapeProviderInterface {
    constructor(
        @Inject(tokens.AQUASCAPE_REPOSITORY) private aquascapeRepository: AquascapeRepositoryInterface,
        @Inject(tokens.VISITOR_REPOSITORY) private visitorRepository: VisitorRepositoryInterface,
    ) {
    }

    async getAquascapes(pagination: Pagination, filter?: AquascapeFilter) {
        return await this.aquascapeRepository.getAquascapes(pagination.limit, filter)
    }

    async getFeaturedAquascape() {
        return await this.aquascapeRepository.getFeaturedAquascape()
    }

    async createAquascape(userId: number, data: CreateAquascapeArgs) {
        return await this.aquascapeRepository.create({userId, ...data})
    }

    async visitAquascape(aquascapeId: number, userId?: string) {
        const visitorId = userId || uuid()
        await this.visitorRepository.addVisitor(aquascapeId, visitorId)

        return visitorId
    }
}