import {DatabaseAdapter} from 'db/adapters/SequelizeAdapter'
import {SyncOptions} from 'sequelize/types'

export interface DatabaseConnectionParams {
    uri: string
}

export interface DatabaseInterface {
    connect: (params: DatabaseConnectionParams) => void

    testConnection: () => Promise<void>
}

export class Database implements DatabaseInterface {
    private adapter: DatabaseAdapter

    constructor(adapter: DatabaseAdapter) {
        this.adapter = adapter
    }

    connect(params: DatabaseConnectionParams) {
        this.adapter.connect(params)
    }

    testConnection() {
        return this.adapter.testConnection()
    }

    sync(options: SyncOptions) {
        return this.adapter.sync(options)
    }
}
