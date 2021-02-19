/* eslint-disable @typescript-eslint/no-explicit-any */
import {Model} from 'sequelize-typescript'
import {NonAbstract} from 'sequelize-typescript/dist/shared/types'
import {
    BulkCreateOptions,
    CountOptions,
    DestroyOptions,
    FindAndCountOptions,
    FindOptions,
    FindOrCreateOptions,
    UpdateOptions,
} from 'sequelize'

type StaticMembers = NonAbstract<typeof Model>
type Constructor<T> = new () => T
type ModelType<T> = Constructor<T> & StaticMembers

export interface BaseRepositoryInterface<T> {
    create(values: any, options?: any): Promise<T>

    findOne(options: FindOptions): Promise<T | null>

    findAll(options?: FindOptions): Promise<T[]>

    update(values: any, options: UpdateOptions): Promise<[number, T[]]>

    destroy(options?: DestroyOptions): Promise<number>

    bulkCreate(records: any[], options?: BulkCreateOptions): Promise<T[]>

    findAndCountAll(options?: FindAndCountOptions): Promise<{rows: T[]; count: number}>

    findOrCreate(options: FindOrCreateOptions): Promise<[T, boolean]>

    count(options?: CountOptions): Promise<number>
}

export class BaseRepository<T extends Model<T>> implements BaseRepositoryInterface<T> {
    constructor(private relation: ModelType<T>) {}

    create(values: any, options?: any): Promise<T> {
        return this.relation.create<T>(values, options)
    }

    findOne(options: FindOptions): Promise<T | null> {
        return this.relation.findOne(options)
    }

    findAll(options?: FindOptions): Promise<T[]> {
        return this.relation.findAll(options)
    }

    findAndCountAll(options?: FindAndCountOptions): Promise<{rows: T[]; count: number}> {
        return this.relation.findAndCountAll(options)
    }

    update(values: any, options: UpdateOptions): Promise<[number, T[]]> {
        return this.relation.update(values, options)
    }

    destroy(options?: DestroyOptions): Promise<number> {
        return this.relation.destroy(options)
    }

    bulkCreate(records: any[], options?: BulkCreateOptions): Promise<T[]> {
        return this.relation.bulkCreate(records, options)
    }

    findOrCreate(options: FindOrCreateOptions): Promise<[T, boolean]> {
        return this.relation.findOrCreate(options)
    }

    count(options?: CountOptions): Promise<number> {
        return this.relation.count(options)
    }
}

export interface EquipmentRepositoryInterface<T> extends BaseRepositoryInterface<T> {
    addEquipment(model: string): Promise<T>
    removeEquipment(equipmentId: number): Promise<number>
    findById(id: number): Promise<T | null>
}

export interface EquipmentAquascapeRepositoryInterface<T> extends BaseRepositoryInterface<T> {
    addEquipmentForAquascape(equipmentId: number, aquascapeId: number): Promise<T>
    removeEquipmentFromAquascape(equipmentId: number, aquascapeId: number): Promise<number>
}
