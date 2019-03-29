import {GraphQLModule} from '@graphql-modules/core'
import {UserModule} from 'graphql/modules/User'
import {AuthModule} from 'graphql/modules/Auth'

export const AppModule = new GraphQLModule({
    imports: [
        UserModule,
        AuthModule
    ]
})