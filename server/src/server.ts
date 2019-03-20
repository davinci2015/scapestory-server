import {ApolloServer} from 'apollo-server'
import {ModuleContext} from '@graphql-modules/core'

export const startup = (AppModule: ModuleContext) => {
    const port = process.env.PORT || 8080
    const server = new ApolloServer({
        schema: AppModule.schema,
        context: AppModule.context
    })

    server.listen(port).then(({url}) => {
        console.log(`🚀  Server ready at ${url}`)
    })
}
