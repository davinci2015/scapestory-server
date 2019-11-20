import {Injectable} from '@graphql-modules/di'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Visitor} from 'db/models/Visitor'

export interface VisitorRepositoryInterface extends BaseRepositoryInterface<Visitor> {
    addVisitor: (aquascapeId: number, visitorId: number) => Promise<Visitor>
    addUnregisteredVisitor: (aquascapeId: number, unregisteredVisitorId?: string) => Promise<Visitor>
}

@Injectable()
export class VisitorRepository extends BaseRepository<Visitor> {
    constructor() {
        super(Visitor)
    }

    async addVisitor(aquascapeId: number, visitorId: number) {
        await this.create({aquascapeId, visitorId})
    }

    async addUnregisteredVisitor(aquascapeId: number, unregisteredVisitorId?: string) {
        await this.create({aquascapeId, unregisteredVisitorId})
    }
}