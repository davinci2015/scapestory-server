import {Injectable, Inject} from 'graphql-modules'

import {SubstrateRepositoryInterface, SubstrateRepository} from 'db/repositories/Substrate'
import {Substrate} from 'db/models/Substrate'

export interface SubstrateProviderInterface {
    getSubstrates: () => Promise<Substrate[]>
}

@Injectable()
export class SubstrateProvider implements SubstrateProviderInterface {
    constructor(
        @Inject(SubstrateRepository)
        private substrateRepository: SubstrateRepositoryInterface
    ) {}

    getSubstrates() {
        return this.substrateRepository.getSubstrates()
    }
}
