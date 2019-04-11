import {Injectable, Inject} from '@graphql-modules/di'
import {Aquascape} from 'db/models/Aquascape'
import {Light} from 'db/models/Light'
import {AquascapeRepositoryInterface} from 'db/repositories/AquascapeRepository'
import {LightRepositoryInterface} from 'db/repositories/LightRepository'
import {tokens} from 'di/tokens'
import {CreateAquascapeArgs} from 'graphql/modules/Aquascape/resolvers'

export interface AquascapeProviderInterface {
    getAquascapes: () => Promise<Aquascape[]>,
    createAquascape: (userId: number, data: CreateAquascapeArgs) => Promise<Aquascape>,
    updateLight: (values: LightUpdateArgs) => Promise<Light>
}

export interface LightUpdateArgs {
    aquascapeId: number,
    lightId?: number,
    name?: string,
    turnedOnAt?: string,
    turnedOfAt?: string
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

    async updateLight(values: LightUpdateArgs) {
        const {aquascapeId, lightId} = values

        const [light, created] = await this.lightRepository.findOrCreate({
            where: {id: lightId},
            defaults: values
        })

        if (light && created) {
            this.lightRepository.
            return light
        }

        const [_, updated] = await this.lightRepository.update(values, {where: {id: light.id}})
        return updated[0]
    }
}