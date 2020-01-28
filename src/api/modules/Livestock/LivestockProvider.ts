import {Injectable, Inject} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {LivestockRepositoryInterface} from 'db/repositories/Livestock'
import {Livestock} from 'db/models/Livestock'
import {AquascapeLivestock} from 'db/models'
import {AquascapeLivestockRepositoryInterface} from 'db/repositories/AquascapeLivestock'

export interface LivestockProviderInterface {
    getLivestock(): Bluebird<Livestock[]>
    addLivestock(name: string): Bluebird<Livestock>
    addLivestockForAquascape(livestockId: number, aquascapeId: number): Bluebird<AquascapeLivestock>
    removeLivestock(id: number): Bluebird<number>
    removeLivestockForAquascape(livestockId: number, aquascapeId: number): Bluebird<number>
    findLivestockById(id: number): Bluebird<Livestock | null>
}

@Injectable()
export class LivestockProvider implements LivestockProviderInterface {
    constructor(
        @Inject(tokens.LIVESTOCK_REPOSITORY)
        private livestockRepository: LivestockRepositoryInterface,
        @Inject(tokens.AQUASCAPE_LIVESTOCK_REPOSITORY)
        private aquascapeLivestockRepository: AquascapeLivestockRepositoryInterface
    ) {}

    getLivestock() {
        return this.livestockRepository.getLivestock()
    }

    addLivestock(name: string): Bluebird<Livestock> {
        return this.livestockRepository.create({name})
    }

    addLivestockForAquascape(livestockId: number, aquascapeId: number): Bluebird<AquascapeLivestock> {
        return this.aquascapeLivestockRepository.addLivestockForAquascape(livestockId, aquascapeId)
    }

    removeLivestock(id: number): Bluebird<number> {
        return this.livestockRepository.destroy({where: {id}})
    }

    removeLivestockForAquascape(livestockId: number, aquascapeId: number): Bluebird<number> {
        return this.aquascapeLivestockRepository.destroy({where: {livestockId, aquascapeId}})
    }

    findLivestockById(id: number) {
        return this.livestockRepository.findLivestockById(id)
    }
}
