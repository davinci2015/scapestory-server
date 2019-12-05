import {Injectable, Inject} from '@graphql-modules/di'
import {Includeable} from 'sequelize/types'
import * as Bluebird from 'bluebird'

import {AquascapeRepositoryInterface} from 'db/repositories/Aquascape'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {tokens} from 'di/tokens'

import {Pagination} from 'graphql/generated/types'

export interface AquascapeProviderInterface {
    getAquascapes: (
        pagination: Pagination,
        userId?: number | null,
        random?: boolean | null,
        include?: Includeable[]
    ) => Promise<{rows: Aquascape[], count: number}>

    getFeaturedAquascape: (include?: Includeable[]) => Bluebird<Aquascape | null>

    getTrendingAquascapes: (pagination: Pagination, include?: Includeable[]) => Bluebird<Aquascape[]>

    getAquascapeById: (id: number, include?: Includeable[]) => Bluebird<Aquascape | null>

    createAquascape: (userId: number) => Promise<Aquascape>

    getAquascapeImages: (aquascapeId: number) => Bluebird<AquascapeImage[]>

    updateAquascapeTitle: (id: number, title: string) => Bluebird<[number, Aquascape[]]>
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

    createAquascape(userId: number) {
        return this.aquascapeRepository.create({userId})
    }

    getAquascapeImages(aquascapeId: number) {
        return this.aquascapeRepository.getAquascapeImages(aquascapeId)
    }

    updateAquascapeTitle(id: number, title: string) {
        return this.aquascapeRepository.updateAquascapeTitle(id, title)
    }
}
