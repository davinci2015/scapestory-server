import {ApolloServer} from 'apollo-server'
import {Application} from 'graphql-modules'

import {SequelizeAdapter} from 'db/adapters/SequelizeAdapter'
import {Database} from 'db/Database'
import {initPassport} from 'api/modules/Auth/passport'
import environment from './config/environment'

export const connectToDatabase = (onConnect?: (db: Database) => void) => {
    const adapter = new SequelizeAdapter()
    const database = new Database(adapter)

    database.connect({uri: environment.DATABASE_URL})

    database
        .testConnection()
        .then(() => console.log('🚀 Connected to database'))
        .then(() => onConnect && onConnect(database))
        .catch(e => console.log('⚠️ Failed to connect to the database!', e))
}

export const startup = (AppModule: Application) => {
    const port = process.env.PORT || 8080

    connectToDatabase()
    initPassport()

    const server = new ApolloServer({
        schema: AppModule.createSchemaForApollo(),
        introspection: true,
        context: context => ({
            req: context.req,
            res: context.res,
        }),
    })

    server.listen(port).then(({url}) => {
        console.log(`🚀  Server ready at ${url}`)
    })
}
