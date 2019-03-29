import * as Bluebird from 'bluebird'
import * as path from 'path'
import {Sequelize} from 'sequelize-typescript'
import {AppHelper} from 'utils/AppHelper'
import {DatabaseConnectionParams} from 'db/Database'

export interface DatabaseAdapter {
    connect: (params: DatabaseConnectionParams) => void,

    testConnection: () => Bluebird<void>
}

export class SequelizeAdapter implements DatabaseAdapter {
    instance: Sequelize

    connect(params: DatabaseConnectionParams) {
        this.instance = new Sequelize({
            host: params.host,
            database: params.database,
            username: params.username,
            password: params.password,
            dialect: 'postgres',
            modelPaths: [
                path.join(__dirname, '../models'),
                path.join(__dirname, '../models/manyToMany')
            ]
        })

        if (AppHelper.isDevelopment()) {
            this.instance.sync({force: true})
                .then(() => console.log('Database synced'))
                .catch((e) => console.log('Failed to sync database', e))
        }
    }

    testConnection() {
        return this.instance.authenticate()
    }
}