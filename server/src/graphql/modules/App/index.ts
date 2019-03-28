import {GraphQLModule} from '@graphql-modules/core'
import {UserModule} from 'graphql/modules/User'
import {AuthModule} from 'graphql/modules/Auth'
import {appConstants} from 'constants/appConstants'
import {AuthHelper} from 'utils/AuthHelper'
import {SessionInterface} from 'interfaces'

export const AppModule = new GraphQLModule({
    imports: [
        UserModule,
        AuthModule
    ],
    context(session: SessionInterface) {
        const authToken = session.req.headers[appConstants.HEADER_AUTH_TOKEN]
        if (!authToken || typeof authToken !== 'string') return

        const currentUser = AuthHelper.decodeJWTToken(authToken)

        return {currentUser}
    }
})