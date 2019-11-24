import {Injectable, Inject} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {HardscapeRepositoryInterface} from 'db/repositories/Hardscape'
import {Hardscape} from 'db/models/Hardscape'

export interface HardscapeProviderInterface {
    getHardscape: () => Bluebird<Hardscape[]>
}

@Injectable()
export class HardscapeProvider implements HardscapeProviderInterface {
    constructor(
        @Inject(tokens.HARDSCAPE_REPOSITORY)
        private hardscapeRepository: HardscapeRepositoryInterface
    ) {}

    getHardscape() {
        return this.hardscapeRepository.getHardscape()
    }
}
