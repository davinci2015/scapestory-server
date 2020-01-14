import {Injectable} from '@graphql-modules/di'
import Bluebird from 'bluebird'
import {
    EquipmentRepositoryInterface,
    EquipmentAquascapeRepositoryInterface,
} from 'db/repositories/Base'

export interface EquipmentProviderInterface<T> {
    addEquipment(model: string): Bluebird<T>
    addEquipmentForAquascape(equipmentId: number, aquascapeId: number): Bluebird<T>
    removeEquipment(id: number): Bluebird<number>
    removeEquipmentFromAquascape(equipmentId: number, aquascapeId: number): Bluebird<number>
    findEquipmentById(id: number): Bluebird<T | null>
    setEquipmentRepository(repository: EquipmentRepositoryInterface<T>): void
    setEquipmentAquascapeRepository(repository: EquipmentAquascapeRepositoryInterface<T>): void
}

@Injectable()
export class EquipmentProvider<T> implements EquipmentProviderInterface<T> {
    equipmentRepository: EquipmentRepositoryInterface<T>
    equipmentAquascapeRepository: EquipmentAquascapeRepositoryInterface<T>

    setEquipmentRepository(repository: EquipmentRepositoryInterface<T>) {
        this.equipmentRepository = repository
    }

    setEquipmentAquascapeRepository(repository: EquipmentAquascapeRepositoryInterface<T>) {
        this.equipmentAquascapeRepository = repository
    }

    addEquipment(model: string) {
        return this.equipmentRepository.addEquipment(model)
    }

    addEquipmentForAquascape(equipmentId: number, aquascapeId: number) {
        return this.equipmentAquascapeRepository.addEquipmentForAquascape(equipmentId, aquascapeId)
    }

    removeEquipment(id: number) {
        return this.equipmentRepository.removeEquipment(id)
    }

    removeEquipmentFromAquascape(equipmentId: number, aquascapeId: number) {
        return this.equipmentAquascapeRepository.removeEquipmentFromAquascape(
            equipmentId,
            aquascapeId
        )
    }

    findEquipmentById(id: number) {
        return this.equipmentRepository.findById(id)
    }
}
