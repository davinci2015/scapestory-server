import {Model} from 'sequelize-typescript'
import {NonAbstract} from 'sequelize-typescript/dist/model'
import * as Bluebird from 'bluebird'
import {
    BulkCreateOptions,
    CountOptions,
    CreateOptions,
    DestroyOptions,
    FindAndCountOptions,
    FindOptions,
    FindOrCreateOptions,
    Promise,
    UpdateOptions,
} from 'sequelize'

type StaticMembers = NonAbstract<typeof Model>
type Constructor<T> = new () => T
type ModelType<T> = Constructor<T> & StaticMembers

export interface BaseRepositoryInterface<T> {
    create(
        values: object,
        options?: CreateOptions & {returning: boolean}
    ): Bluebird<T>

    findOne(options: FindOptions): Bluebird<T | null>

    findAll(options?: FindOptions): Promise<T[]>

    update(values: object, options: UpdateOptions): Promise<[number, T[]]>

    destroy(options?: DestroyOptions): Promise<number>

    bulkCreate(records: object[], options?: BulkCreateOptions): Promise<T[]>

    findAndCountAll(
        options?: FindAndCountOptions
    ): Promise<{rows: T[]; count: number}>

    findOrCreate(options: FindOrCreateOptions): Promise<[T, boolean]>

    count(options?: CountOptions): Promise<number>
}

export class BaseRepository<T extends Model<T>>
    implements BaseRepositoryInterface<T> {
    constructor(private relation: ModelType<T>) {}

    create(
        values: object,
        options?: CreateOptions & {returning: boolean}
    ): Bluebird<T> {
        return this.relation.create<T>(values, options)
    }

    findOne(options: FindOptions): Bluebird<T | null> {
        return this.relation.findOne(options)
    }

    findAll(options?: FindOptions): Promise<T[]> {
        return this.relation.findAll(options)
    }

    findAndCountAll(
        options?: FindAndCountOptions
    ): Promise<{rows: T[]; count: number}> {
        return this.relation.findAndCountAll(options)
    }

    update(values: object, options: UpdateOptions): Promise<[number, T[]]> {
        return this.relation.update(values, options)
    }

    destroy(options?: DestroyOptions): Promise<number> {
        return this.relation.destroy(options)
    }

    bulkCreate(records: object[], options?: BulkCreateOptions): Promise<T[]> {
        return this.relation.bulkCreate(records, options)
    }

    findOrCreate(options: FindOrCreateOptions): Promise<[T, boolean]> {
        return this.relation.findOrCreate(options)
    }

    count(options?: CountOptions): Promise<number> {
        return this.relation.count(options)
    }
}
