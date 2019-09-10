import {Injectable} from '@graphql-modules/di'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Visitor} from 'db/models/Visitor'

export interface VisitorRepositoryInterface extends BaseRepositoryInterface<Visitor> {
    addVisitor: (aquascapeId: number, userId: string) => Promise<Visitor>,
    countViewsForAquascape(id: number): Promise<number>
}

@Injectable()
export class VisitorRepository extends BaseRepository<Visitor> {
    constructor() {
        super(Visitor)
    }

    async addVisitor(aquascapeId: number, userId: string) {
        return await this.create({aquascapeId, visitorId: userId})
    }

    async countViewsForAquascape(aquascapeId: number) {
        return await this.count({where: {aquascapeId}})
    }
}