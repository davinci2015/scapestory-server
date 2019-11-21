import {Injectable, Inject} from '@graphql-modules/di'
import {Includeable} from 'sequelize/types'
import * as Bluebird from 'bluebird'

import {AquascapeRepositoryInterface} from 'db/repositories/Aquascape'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {tokens} from 'di/tokens'
import {Pagination} from 'interfaces'

import {CreateAquascapeArgs} from './resolvers'

export interface AquascapeProviderInterface {
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

    createAquascape: (
        userId: number,
        data: CreateAquascapeArgs
    ) => Promise<Aquascape>

    getAquascapeImages: (aquascapeId: number) => Bluebird<AquascapeImage[]>
}

@Injectable()
export class AquascapeProvider implements AquascapeProviderInterface {
    constructor(
        @Inject(tokens.AQUASCAPE_REPOSITORY)
        private aquascapeRepository: AquascapeRepositoryInterface
    ) {}

    getAquascapes(
        pagination: Pagination,
        userId?: number,
        random?: boolean,
        include?: Includeable[]
    ) {
        return this.aquascapeRepository.getAquascapes(
            pagination,
            userId,
            random,
            include
        )
    }

    getFeaturedAquascape(include?: Includeable[]) {
        return this.aquascapeRepository.getFeaturedAquascape(include)
    }

    getTrendingAquascapes(pagination: Pagination, include?: Includeable[]) {
        return this.aquascapeRepository.getTrendingAquascapes(
            pagination,
            include
        )
    }

    getAquascapeById(id: number, include?: Includeable[]) {
        return this.aquascapeRepository.getAquascapeById(id, include)
    }

    async createAquascape(userId: number, data: CreateAquascapeArgs) {
        return this.aquascapeRepository.create({userId, ...data})
    }

    getAquascapeImages(aquascapeId: number) {
        return this.aquascapeRepository.getAquascapeImages(aquascapeId)
    }
}
