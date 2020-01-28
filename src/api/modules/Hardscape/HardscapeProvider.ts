import {Injectable, Inject} from '@graphql-modules/di'
import Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {HardscapeRepositoryInterface} from 'db/repositories/Hardscape'
import {Hardscape} from 'db/models/Hardscape'
import {AquascapeHardscape} from 'db/models'
import {AquascapeHardscapeRepositoryInterface} from 'db/repositories/AquascapeHardscape'

export interface HardscapeProviderInterface {
    getHardscape: () => Bluebird<Hardscape[]>
    addHardscape(name: string): Bluebird<Hardscape>
    addHardscapeForAquascape(hardscapeId: number, aquascapeId: number): Bluebird<AquascapeHardscape>
    removeHardscape(id: number): Bluebird<number>
    removeHardscapeForAquascape(hardscapeId: number, aquascapeId: number): Bluebird<number>
    findHardscapeById(id: number): Bluebird<Hardscape | null>
}

@Injectable()
export class HardscapeProvider implements HardscapeProviderInterface {
    constructor(
        @Inject(tokens.HARDSCAPE_REPOSITORY)
        private hardscapeRepository: HardscapeRepositoryInterface,
        @Inject(tokens.AQUASCAPE_HARDSCAPE_REPOSITORY)
        private aquascapeHardscapeRepository: AquascapeHardscapeRepositoryInterface
    ) {}

    getHardscape() {
        return this.hardscapeRepository.getHardscape()
    }

    addHardscape(name: string): Bluebird<Hardscape> {
        return this.hardscapeRepository.create({name})
    }

    addHardscapeForAquascape(hardscapeId: number, aquascapeId: number): Bluebird<AquascapeHardscape> {
        return this.aquascapeHardscapeRepository.addHardscapeForAquascape(hardscapeId, aquascapeId)
    }

    removeHardscape(id: number): Bluebird<number> {
        return this.hardscapeRepository.destroy({where: {id}})
    }

    removeHardscapeForAquascape(hardscapeId: number, aquascapeId: number): Bluebird<number> {
        return this.aquascapeHardscapeRepository.destroy({where: {hardscapeId, aquascapeId}})
    }

    findHardscapeById(id: number): Bluebird<Hardscape | null> {
        return this.hardscapeRepository.findHardscapeById(id)
    }
}
