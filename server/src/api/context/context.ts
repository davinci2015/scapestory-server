import {ModuleContext, BuildContextFn, ModuleSessionInfo} from '@graphql-modules/core'
import {Config} from 'apollo-server'

import headers from 'constants/headers'
import {AuthHelper} from 'utils/AuthHelper'
import {SessionInterface} from 'interfaces'

export type AuthenticationContext = {
    currentUserId: number
}

export type SessionContext = SessionInterface

export const composeContext = (contexts: Function[]): BuildContextFn<Config, ModuleSessionInfo, ModuleContext> =>
    (session: ModuleSessionInfo, currentContext: ModuleContext, moduleSessionInfo: ModuleSessionInfo) =>
        contexts.reduce((acc, ctx) => (
            {
                ...acc,
                ...ctx(session, currentContext, moduleSessionInfo),
            }
        ), {})

export const attachCurrentUserId = (session: SessionInterface): {currentUserId: number} | object => {
    const authToken = session.req.headers[headers.AUTH_TOKEN]
    if (!authToken || typeof authToken !== 'string') {
        return {}
    }

    try {
        const jwtPayload = AuthHelper.decodeJWTToken(authToken)

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
    res: session.res,
})
