import {Injectable} from 'graphql-modules'

import {BaseRepository, EquipmentRepositoryInterface} from 'db/repositories/Base'
import {Filter} from 'db/models/Filter'

export interface FilterRepositoryInterface extends EquipmentRepositoryInterface<Filter> {
    getFilters: () => Promise<Filter[]>
}

@Injectable()
export class FilterRepository extends BaseRepository<Filter> implements FilterRepositoryInterface {
    constructor() {
        super(Filter)
    }

    getFilters() {
        return this.findAll({where: {predefined: true}})
    }

    findById(id: number) {
        return this.findOne({where: {id}})
    }

    addEquipment(model: string) {
        return this.create({model})
    }

    removeEquipment(id: number) {
        return this.destroy({where: {id}})
    }
}
