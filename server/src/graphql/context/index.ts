import {ModuleContext} from '@graphql-modules/core'
import {appConstants} from 'constants/appConstants'
import {AuthHelper} from 'utils/AuthHelper'
import {User} from 'db/models/User'
import {SessionInterface} from 'interfaces'

export type AuthenticationContext = {
    currentUser: User,
}

export const composeContext = (contexts: Array<(
    session: SessionInterface,
    currentContext: ModuleContext,
    moduleSessionInfo: SessionInterface
) => Promise<object> | object>) => {
    return (session: SessionInterface,
            currentContext: ModuleContext,
            moduleSessionInfo: SessionInterface
    ) => {
        return contexts.reduce((acc: ModuleContext, ctx: (
            session: SessionInterface,
            currentContext: ModuleContext,
            moduleSessionInfo: SessionInterface
        ) => ModuleContext) => {
            return ({...acc, ...ctx(session, currentContext, moduleSessionInfo)})
        }, {})
    }
}

export const context = {
    attachCurrentUser(session: SessionInterface): object {
        let jwtPayload = null
        let user = null

        const authToken = session.req.headers[appConstants.HEADER_AUTH_TOKEN]

        if (!authToken || typeof authToken !== 'string') {
            return
        }

        try {
            jwtPayload = AuthHelper.decodeJWTToken(authToken)
            user = jwtPayload.user
        } catch (e) {
            console.log('Invalid jwt token')
        }

        return {currentUser: user}
    },
}