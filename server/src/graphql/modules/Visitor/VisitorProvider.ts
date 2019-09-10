import {Injectable, Inject} from '@graphql-modules/di'

import {tokens} from 'di/tokens'
import {VisitorRepositoryInterface} from 'db/repositories/Visitor'

export interface VisitorProviderInterface {
    countViewsForAquascape: (id: number) => Promise<number>
}

@Injectable()
export class VisitorProvider implements VisitorProviderInterface {
    constructor(
        @Inject(tokens.VISITOR_REPOSITORY) private visitorRepository: VisitorRepositoryInterface
    ) {
    }

    async countViewsForAquascape(id: number) {
        return await this.visitorRepository.countViewsForAquascape(id)
    }
}