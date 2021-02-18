import {Injectable} from 'graphql-modules'

import {BaseRepository, EquipmentRepositoryInterface} from 'db/repositories/Base'
import {Substrate} from 'db/models/Substrate'

export interface SubstrateRepositoryInterface extends EquipmentRepositoryInterface<Substrate> {
    getSubstrates: () => Promise<Substrate[]>
}

@Injectable()
export class SubstrateRepository
    extends BaseRepository<Substrate>
    implements SubstrateRepositoryInterface {
    constructor() {
        super(Substrate)
    }

    getSubstrates() {
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
