import {Injectable, Inject} from '@graphql-modules/di'

import {tokens} from 'di/tokens'
import {LightRepositoryInterface} from 'db/repositories/Light'
import {Light} from 'db/models/Light'

export interface LightProviderInterface {
    getLights: () => Promise<Light[]>
}

@Injectable()
export class LightProvider implements LightProviderInterface {
    constructor(
        @Inject(tokens.LIGHT_REPOSITORY) private lightRepository: LightRepositoryInterface
    ) {
    }

    async getLights() {
        return await this.lightRepository.findAll()
    }
}