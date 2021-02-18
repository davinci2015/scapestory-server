import {Injectable, Inject} from 'graphql-modules'

import {HardscapeRepositoryInterface, HardscapeRepository} from 'db/repositories/Hardscape'
import {Hardscape} from 'db/models/Hardscape'
import {AquascapeHardscape} from 'db/models'
import {
    AquascapeHardscapeRepositoryInterface,
    AquascapeHardscapeRepository,
} from 'db/repositories/AquascapeHardscape'

export interface HardscapeProviderInterface {
    getHardscape: () => Promise<Hardscape[]>
    addHardscape(name: string): Promise<Hardscape>
    addHardscapeForAquascape(hardscapeId: number, aquascapeId: number): Promise<AquascapeHardscape>
    removeHardscape(id: number): Promise<number>
    removeHardscapeForAquascape(hardscapeId: number, aquascapeId: number): Promise<number>
    findHardscapeById(id: number): Promise<Hardscape | null>
}

@Injectable()
export class HardscapeProvider implements HardscapeProviderInterface {
    constructor(
        @Inject(HardscapeRepository)
        private hardscapeRepository: HardscapeRepositoryInterface,
        @Inject(AquascapeHardscapeRepository)
        private aquascapeHardscapeRepository: AquascapeHardscapeRepositoryInterface
    ) {}

    getHardscape() {
        return this.hardscapeRepository.getHardscape()
    }

    addHardscape(name: string): Promise<Hardscape> {
        return this.hardscapeRepository.create({name})
    }

    addHardscapeForAquascape(
        hardscapeId: number,
        aquascapeId: number
    ): Promise<AquascapeHardscape> {
        return this.aquascapeHardscapeRepository.addHardscapeForAquascape(hardscapeId, aquascapeId)
    }

    removeHardscape(id: number): Promise<number> {
        return this.hardscapeRepository.destroy({where: {id}})
    }

    removeHardscapeForAquascape(hardscapeId: number, aquascapeId: number): Promise<number> {
        return this.aquascapeHardscapeRepository.destroy({where: {hardscapeId, aquascapeId}})
    }

    findHardscapeById(id: number): Promise<Hardscape | null> {
        return this.hardscapeRepository.findHardscapeById(id)
    }
}
