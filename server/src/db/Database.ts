import * as Bluebird from 'bluebird'
import {DatabaseAdapter} from 'db/adapters/SequelizeAdapter'

export type DatabaseConnectionParams = {
    dbname: string,
    username: string,
    password: string,
    host: string
}

export interface DatabaseInterface {
    connect: (params: DatabaseConnectionParams) => void,

    testConnection: () => Bluebird<void>
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
}