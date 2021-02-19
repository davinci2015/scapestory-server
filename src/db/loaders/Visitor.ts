import {Inject, Injectable, Scope} from 'graphql-modules'
import * as DataLoader from 'dataloader'

import {VisitorRepository, VisitorRepositoryInterface} from 'db/repositories/Visitor'

export interface VisitorDataLoaderInterface {
    countViews(aquascapeId: number): Promise<number>
}

@Injectable({scope: Scope.Operation})
export class VisitorDataLoader implements VisitorDataLoaderInterface {
    aquascapeVisitLoader: DataLoader<number, number>

    constructor(@Inject(VisitorRepository) private visitorRepository: VisitorRepositoryInterface) {
        this.aquascapeVisitLoader = new DataLoader(this.batchCountAquascapeVisits)
    }

    countViews(aquascapeId: number) {
        return this.aquascapeVisitLoader.load(aquascapeId)
    }

    private batchCountAquascapeVisits = async (ids: number[]) => {
        const views = await this.visitorRepository.findAll({where: {aquascapeId: ids}})

        return ids.map(id => views.filter(view => view.aquascapeId === id).length)
    }
}
