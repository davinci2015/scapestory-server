import {Injectable, Inject} from 'graphql-modules'

import {LivestockRepositoryInterface, LivestockRepository} from 'db/repositories/Livestock'
import {Livestock} from 'db/models/Livestock'
import {AquascapeLivestock} from 'db/models'
import {
    AquascapeLivestockRepositoryInterface,
    AquascapeLivestockRepository,
} from 'db/repositories/AquascapeLivestock'

export interface LivestockProviderInterface {
    getLivestock(): Promise<Livestock[]>
    addLivestock(name: string): Promise<Livestock>
    addLivestockForAquascape(livestockId: number, aquascapeId: number): Promise<AquascapeLivestock>
    removeLivestock(id: number): Promise<number>
    removeLivestockForAquascape(livestockId: number, aquascapeId: number): Promise<number>
    findLivestockById(id: number): Promise<Livestock | null>
}

@Injectable()
export class LivestockProvider implements LivestockProviderInterface {
    constructor(
        @Inject(LivestockRepository)
        private livestockRepository: LivestockRepositoryInterface,
        @Inject(AquascapeLivestockRepository)
        private aquascapeLivestockRepository: AquascapeLivestockRepositoryInterface
    ) {}

    getLivestock() {
        return this.livestockRepository.getLivestock()
    }

    addLivestock(name: string): Promise<Livestock> {
        return this.livestockRepository.create({name})
    }

    addLivestockForAquascape(
        livestockId: number,
        aquascapeId: number
    ): Promise<AquascapeLivestock> {
        return this.aquascapeLivestockRepository.addLivestockForAquascape(livestockId, aquascapeId)
    }

    removeLivestock(id: number): Promise<number> {
        return this.livestockRepository.destroy({where: {id}})
    }

    removeLivestockForAquascape(livestockId: number, aquascapeId: number): Promise<number> {
        return this.aquascapeLivestockRepository.destroy({where: {livestockId, aquascapeId}})
    }

    findLivestockById(id: number) {
        return this.livestockRepository.findLivestockById(id)
    }
}
