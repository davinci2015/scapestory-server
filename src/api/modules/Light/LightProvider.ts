import {Injectable, Inject} from 'graphql-modules'

import {LightRepositoryInterface, LightRepository} from 'db/repositories/Light'
import {Light} from 'db/models/Light'

export interface LightProviderInterface {
    getLights: () => Promise<Light[]>
}

@Injectable()
export class LightProvider implements LightProviderInterface {
    constructor(
        @Inject(LightRepository)
        private lightRepository: LightRepositoryInterface
    ) {}

    async getLights() {
        return await this.lightRepository.findAll()
    }
}
