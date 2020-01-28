import {Injectable, Inject, ProviderScope} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {Visitor} from 'db/models/Visitor'
import {VisitorRepositoryInterface} from 'db/repositories/Visitor'

export interface VisitorProviderInterface {
    visitAquascape(
        aquascapeId: number,
        visitorId?: string
    ): Bluebird<[Visitor, boolean]>
    countViews(aquascapeId: number): Promise<number>
}

@Injectable({scope: ProviderScope.Session})
export class VisitorProvider implements VisitorProviderInterface {
    constructor(
        @Inject(tokens.VISITOR_REPOSITORY)
        private visitorRepository: VisitorRepositoryInterface
    ) {}

    visitAquascape(aquascapeId: number, visitorId?: string) {
        return this.visitorRepository.addVisitor(aquascapeId, visitorId)
    }

    countViews(aquascapeId: number) {
        return this.visitorRepository.countViews(aquascapeId)
    }
}
