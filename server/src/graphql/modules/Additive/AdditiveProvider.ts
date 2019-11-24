import {Injectable, Inject} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {AdditiveRepositoryInterface} from 'db/repositories/Additive'
import {Additive} from 'db/models/Additive'

export interface AdditiveProviderInterface {
    getAdditives: () => Bluebird<Additive[]>
}

@Injectable()
export class AdditiveProvider implements AdditiveProviderInterface {
    constructor(
        @Inject(tokens.ADDITIVE_REPOSITORY)
        private AdditiveRepository: AdditiveRepositoryInterface
    ) {}

    getAdditives() {
        return this.AdditiveRepository.getAdditives()
    }
}
