import {Injectable, Inject} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {LivestockRepositoryInterface} from 'db/repositories/Livestock'
import {Livestock} from 'db/models/Livestock'

export interface LivestockProviderInterface {
    getLivestock: () => Bluebird<Livestock[]>
}

@Injectable()
export class LivestockProvider implements LivestockProviderInterface {
    constructor(
        @Inject(tokens.LIVESTOCK_REPOSITORY)
        private LivestockRepository: LivestockRepositoryInterface
    ) {}

    getLivestock() {
        return this.LivestockRepository.getLivestock()
    }
}
