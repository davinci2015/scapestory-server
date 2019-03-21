import {GraphQLModule} from '@graphql-modules/core'
import {UserModule} from 'graphql/modules/User'

export const AppModule = new GraphQLModule({
    imports: [
        UserModule
    ]
})