import {ApolloServer} from 'apollo-server'
import {SequelizeAdapter} from 'db/adapters/SequelizeAdapter'
import {Database} from 'db/Database'
import {initPassport} from 'api/modules/Auth/passport'
import {Application} from 'graphql-modules'

export const connectToDatabase = (onConnect?: (db: Database) => void) => {
    const adapter = new SequelizeAdapter()
    const database = new Database(adapter)

    database.connect({
        host: process.env.DB_HOST || '',
        username: process.env.DB_USER || '',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || '',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    })

    database
        .testConnection()
        .then(() => console.log(`🚀 Connected to ${process.env.DB_NAME} database`))
        .then(() => onConnect && onConnect(database))
        .catch(() => console.log('⚠️ Failed to connect to the database!'))
}

export const startup = (AppModule: Application) => {
    const port = process.env.PORT || 8080

    connectToDatabase()
    initPassport()

    const server = new ApolloServer({
        schema: AppModule.createSchemaForApollo(),
        introspection: true,
    })

    server.listen(port).then(({url}) => {
        console.log(`🚀  Server ready at ${url}`)
    })
}
