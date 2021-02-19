import {Injectable, Inject} from 'graphql-modules'

import {Visitor} from 'db/models/Visitor'
import {VisitorRepositoryInterface, VisitorRepository} from 'db/repositories/Visitor'

export interface VisitorProviderInterface {
    visitAquascape(aquascapeId: number, visitorId?: string): Promise<[Visitor, boolean]>
}

@Injectable()
export class VisitorProvider implements VisitorProviderInterface {
    constructor(
        @Inject(VisitorRepository)
        private visitorRepository: VisitorRepositoryInterface
    ) {}

    visitAquascape(aquascapeId: number, visitorId?: string) {
        return this.visitorRepository.addVisitor(aquascapeId, visitorId)
    }
}
