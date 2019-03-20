import {GraphQLModule} from '@graphql-modules/core'
import {UserModule} from '../User'

export const AppModule = new GraphQLModule({
    imports: [
        UserModule
    ]
})