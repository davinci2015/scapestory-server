import {Injectable} from 'graphql-modules'
import {v4 as uuidv4} from 'uuid'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Visitor} from 'db/models/Visitor'

export interface VisitorRepositoryInterface extends BaseRepositoryInterface<Visitor> {
    addVisitor(aquascapeId: number, visitorId?: string): Promise<[Visitor, boolean]>
}

@Injectable()
export class VisitorRepository
    extends BaseRepository<Visitor>
    implements VisitorRepositoryInterface {
    constructor() {
        super(Visitor)
    }

    addVisitor(aquascapeId: number, visitorId: string = uuidv4()) {
        return this.findOrCreate({
            where: {visitorId, aquascapeId},
        })
    }
}
