import {Injectable} from 'graphql-modules'
import {v4 as uuidv4} from 'uuid'
import * as DataLoader from 'dataloader'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Visitor} from 'db/models/Visitor'

export interface VisitorRepositoryInterface extends BaseRepositoryInterface<Visitor> {
    addVisitor(aquascapeId: number, visitorId: string): Promise<[Visitor, boolean]>
    countViews(aquascapeId: number): Promise<number>
}

@Injectable()
export class VisitorRepository
    extends BaseRepository<Visitor>
    implements VisitorRepositoryInterface {
    aquascapeVisitLoader: DataLoader<number, number>

    constructor() {
        super(Visitor)
        this.aquascapeVisitLoader = new DataLoader(this.batchCountAquascapeVisits)
    }

    addVisitor(aquascapeId: number, visitorId: string = uuidv4()) {
        return this.findOrCreate({
            where: {visitorId, aquascapeId},
        })
    }

    countViews(aquascapeId: number) {
        return this.aquascapeVisitLoader.load(aquascapeId)
    }

    private batchCountAquascapeVisits = async (ids: number[]) => {
        const views = await this.findAll({where: {aquascapeId: ids}})

        return ids.map(id => views.filter(view => view.aquascapeId === id).length)
    }
}
