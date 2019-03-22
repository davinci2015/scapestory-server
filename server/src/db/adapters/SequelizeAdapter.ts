import {Sequelize} from 'sequelize'
import * as Bluebird from 'bluebird'
import {DatabaseConnectionParams} from 'db/Database'

export interface DatabaseAdapter {
    connect: (params: DatabaseConnectionParams) => void,

    testConnection: () => Bluebird<void>
}

export class SequelizeAdapter implements DatabaseAdapter {
    instance: Sequelize

    connect(params: DatabaseConnectionParams) {
        this.instance = new Sequelize({
            ...params,
            dialect: 'postgres'
        })
    }

    testConnection() {
        return this.instance.authenticate()
    }
}