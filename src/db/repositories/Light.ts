import {Injectable} from '@graphql-modules/di'
import {BaseRepository, EquipmentRepositoryInterface} from 'db/repositories/Base'
import {Light} from 'db/models/Light'

export interface LightRepositoryInterface extends EquipmentRepositoryInterface<Light> {}

@Injectable()
export class LightRepository extends BaseRepository<Light> implements LightRepositoryInterface {
    constructor() {
        super(Light)
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
