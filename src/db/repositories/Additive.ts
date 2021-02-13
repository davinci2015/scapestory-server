import {Injectable} from 'graphql-modules'

import {BaseRepository, EquipmentRepositoryInterface} from 'db/repositories/Base'
import {Additive} from 'db/models/Additive'

export interface AdditiveRepositoryInterface extends EquipmentRepositoryInterface<Additive> {
    getAdditives: () => Promise<Additive[]>
}

@Injectable()
export class AdditiveRepository
    extends BaseRepository<Additive>
    implements AdditiveRepositoryInterface {
    constructor() {
        super(Additive)
    }

    getAdditives() {
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
