import * as Bluebird from 'bluebird'
import * as path from 'path'
import {Sequelize} from 'sequelize-typescript'
import {DatabaseConnectionParams} from 'db/Database'
import {SyncOptions} from 'sequelize/types'

export interface DatabaseAdapter {
    connect: (params: DatabaseConnectionParams) => void

    testConnection: () => Bluebird<void>

    sync: (options: SyncOptions) => Bluebird<Sequelize>
}

export class SequelizeAdapter implements DatabaseAdapter {
    instance: Sequelize

    connect(params: DatabaseConnectionParams) {
        this.instance = new Sequelize({
            host: params.host,
            port: params.port,
            database: params.database,
            username: params.username,
            password: params.password,
            dialect: 'postgres',
            modelPaths: [
                path.join(__dirname, '../models'),
                path.join(__dirname, '../models/manyToMany'),
            ],
        })
    }

    testConnection() {
        return this.instance.authenticate()
    }

    sync(options: SyncOptions) {
        return this.instance.sync(options)
    }
}
