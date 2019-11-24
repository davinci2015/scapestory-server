import {Injectable, Inject} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {SubstrateRepositoryInterface} from 'db/repositories/Substrate'
import {Substrate} from 'db/models/Substrate'

export interface SubstrateProviderInterface {
    getSubstrates: () => Bluebird<Substrate[]>
}

@Injectable()
export class SubstrateProvider implements SubstrateProviderInterface {
    constructor(
        @Inject(tokens.SUBSTRATE_REPOSITORY)
        private substrateRepository: SubstrateRepositoryInterface
    ) {}

    getSubstrates() {
        return this.substrateRepository.getSubstrates()
    }
}
