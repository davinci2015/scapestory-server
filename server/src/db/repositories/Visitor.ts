import {Injectable} from '@graphql-modules/di'
import * as uuid from 'uuid/v4'
import * as Bluebird from 'bluebird'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Visitor} from 'db/models/Visitor'

export interface VisitorRepositoryInterface extends BaseRepositoryInterface<Visitor> {
    addVisitor: (aquascapeId: number, visitorId?: string) => Bluebird<[Visitor, boolean]>
}

@Injectable()
export class VisitorRepository extends BaseRepository<Visitor> implements VisitorRepositoryInterface {
    constructor() {
        super(Visitor)
    }

    addVisitor(aquascapeId: number, visitorId?: string) {
        return this.findOrCreate({where: {visitorId: visitorId || uuid(), aquascapeId}})
    }
}