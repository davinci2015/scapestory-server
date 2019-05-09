import {Injectable, Inject} from '@graphql-modules/di'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeRepositoryInterface} from 'db/repositories/AquascapeRepository'
import {LightRepositoryInterface} from 'db/repositories/LightRepository'
import {tokens} from 'di/tokens'
import {CreateAquascapeArgs} from 'graphql/modules/Aquascape/resolvers'

export interface AquascapeProviderInterface {
    getAquascapes: () => Promise<Aquascape[]>,

    createAquascape: (userId: number, data: CreateAquascapeArgs) => Promise<Aquascape>
}

@Injectable()
export class AquascapeProvider implements AquascapeProviderInterface {
    constructor(
        @Inject(tokens.AQUASCAPE_REPOSITORY) private aquascapeRepository: AquascapeRepositoryInterface,
        @Inject(tokens.LIGHT_REPOSITORY) private lightRepository: LightRepositoryInterface
    ) {
    }

    async getAquascapes() {
        return await this.aquascapeRepository.findAll()
    }

    async createAquascape(userId: number, data: CreateAquascapeArgs) {
        return await this.aquascapeRepository.create({userId, ...data})
    }
}