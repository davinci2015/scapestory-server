import {Injectable, Inject} from 'graphql-modules'

import {AdditiveRepositoryInterface, AdditiveRepository} from 'db/repositories/Additive'
import {Additive} from 'db/models/Additive'

export interface AdditiveProviderInterface {
    getAdditives: () => Promise<Additive[]>
}

@Injectable()
export class AdditiveProvider implements AdditiveProviderInterface {
    constructor(
        @Inject(AdditiveRepository)
        private additiveRepository: AdditiveRepositoryInterface
    ) {}

    getAdditives() {
        return this.additiveRepository.getAdditives()
    }
}
