import {ModuleContext} from '@graphql-modules/core'
import {appConstants} from 'constants/appConstants'
import {AuthHelper, JWTTokenPayload} from 'utils/AuthHelper'
import {User} from 'db/models/User'
import {SessionInterface} from 'interfaces'
import {Context} from 'apollo-server-core'

export type AuthenticationContext = {
    currentUser: User
}

export type SessionContext = SessionInterface

export const composeContext = (contexts: Array<(
    session: SessionInterface,
    currentContext: ModuleContext,
    moduleSessionInfo: SessionInterface
) => Promise<Context> | Context>) => {
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

export const attachCurrentUserId = (
    session: SessionInterface,
    currentContext: ModuleContext,
    moduleSessionInfo: SessionInterface
): {currentUserId: number} | object => {
    const authToken = session.req.headers[appConstants.headers.AUTH_TOKEN]

    if (!authToken || typeof authToken !== 'string') {
        return {}
    }

    try {
        let jwtPayload: JWTTokenPayload | null
        jwtPayload = AuthHelper.decodeJWTToken(authToken)

        if (!jwtPayload) {
            throw Error()
        }

        return {currentUserId: jwtPayload.userId}
    } catch (e) {
        console.log('Invalid JWT token')
    }

    return {}
}

export const attachSession = (session: SessionInterface): SessionContext => ({
    req: session.req,
    res: session.res
})