import {Injectable, Inject} from '@graphql-modules/di'
import * as uuid from 'uuid/v4'

import {tokens} from 'di/tokens'
import {VisitorRepositoryInterface} from 'db/repositories/Visitor'

export interface VisitorProviderInterface {
    visitAquascape(aquascapeId: number, userId?: number): Promise<number | string>
}

@Injectable()
export class VisitorProvider implements VisitorProviderInterface {
    constructor(
        @Inject(tokens.VISITOR_REPOSITORY) private visitorRepository: VisitorRepositoryInterface,
    ) {
    }

    async visitAquascape(aquascapeId: number, userId?: number) {
        if (userId) {
            await this.visitorRepository.addVisitor(aquascapeId, userId)
            return userId
        } else {
            const unregisteredVisitorId = uuid()
            await this.visitorRepository.addUnregisteredVisitor(aquascapeId, unregisteredVisitorId)
            return unregisteredVisitorId
        }
    }
}