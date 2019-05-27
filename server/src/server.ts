import {ApolloServer} from 'apollo-server'
import {ModuleContext} from '@graphql-modules/core'
import {SequelizeAdapter} from 'db/adapters/SequelizeAdapter'
import {Database} from 'db/Database'
import {initPassport} from 'graphql/modules/Auth/passport'

const connectToDatabase = () => {
    const adapter = new SequelizeAdapter()
    const database = new Database(adapter)

    database.connect({
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    })

    database.testConnection()
        .then(() => console.log(`🚀 Connected to ${process.env.DB_NAME} database`))
        .catch(() => console.log('⚠️ Failed to connect to the database!'))
}

export const startup = (AppModule: ModuleContext) => {
    const port = process.env.PORT || 8080
    connectToDatabase()
    initPassport()

    const server = new ApolloServer({
        schema: AppModule.schema,
        context: AppModule.context,
    })

    server.listen(port).then(({url}) => {
        console.log(`🚀  Server ready at ${url}`)
    })
}