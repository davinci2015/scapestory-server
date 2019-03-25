import {Model} from 'sequelize-typescript'
import {CreateOptions, NonNullFindOptions} from 'sequelize'
import {NonAbstract} from 'sequelize-typescript/dist/model'
import * as Bluebird from 'bluebird'

type StaticMembers = NonAbstract<typeof Model>
type Constructor<T> = (new () => T)
type ModelType<T> = Constructor<T> & StaticMembers

interface DatabaseWrite<T> {
    create(values: object, options: CreateOptions & { returning: false }): Bluebird<T>,

    findOne(options: NonNullFindOptions): Bluebird<T | null>;
}

export class BaseRepository<T extends Model<T>> implements DatabaseWrite<T> {
    constructor(private relation: ModelType<T>) {
    }

    create(values: any, options: CreateOptions & { returning: false }): Bluebird<T> {
        return this.relation.create<T>(values, options)
    }

    findOne(options: NonNullFindOptions): Bluebird<T | null> {
        return this.relation.findOne(options)
    }
}