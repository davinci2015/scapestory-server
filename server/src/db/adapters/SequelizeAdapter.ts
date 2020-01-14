import Bluebird from 'bluebird'
import {Sequelize} from 'sequelize-typescript'
import {DatabaseConnectionParams} from 'db/Database'
import {SyncOptions} from 'sequelize/types'
import {
    Additive,
    Aquascape,
    AquascapeImage,
    Visitor,
    Comment,
    AquascapeTag,
    CO2,
    Filter,
    Follow,
    Hardscape,
    Light,
    Like,
    Livestock,
    Plant,
    SocialLogin,
    Substrate,
    Tag,
    Tank,
    User,
    AquascapeAdditive,
    AquascapeFilter,
    AquascapeHardscape,
    AquascapeLight,
    AquascapeLivestock,
    AquascapePlant,
    AquascapeSubstrate,
} from 'db/models'
import {Brand} from 'db/models/Brand'

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
            models: [
                Additive,
                Aquascape,
                AquascapeImage,
                AquascapeTag,
                CO2,
                Comment,
                Filter,
                Brand,
                Follow,
                Hardscape,
                Light,
                Like,
                Livestock,
                Plant,
                SocialLogin,
                Substrate,
                Tag,
                Tank,
                User,
                Visitor,
                AquascapeAdditive,
                AquascapeFilter,
                AquascapeHardscape,
                AquascapeLight,
                AquascapeLivestock,
                AquascapePlant,
                AquascapeSubstrate,
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
