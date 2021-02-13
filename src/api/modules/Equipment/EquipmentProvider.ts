import {Injectable} from 'graphql-modules'
import {
    EquipmentRepositoryInterface,
    EquipmentAquascapeRepositoryInterface,
} from 'db/repositories/Base'

export interface EquipmentProviderInterface<T> {
    addEquipment(model: string): Promise<T>
    addEquipmentForAquascape(equipmentId: number, aquascapeId: number): Promise<T>
    removeEquipment(id: number): Promise<number>
    removeEquipmentFromAquascape(equipmentId: number, aquascapeId: number): Promise<number>
    findEquipmentById(id: number): Promise<T | null>
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
