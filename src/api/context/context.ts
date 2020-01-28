import {ModuleContext, BuildContextFn, ModuleSessionInfo} from '@graphql-modules/core'
import {Config} from 'apollo-server'

import headers from 'constants/headers'
import {AuthHelper, AuthTokenPayload} from 'utils/AuthHelper'
import {SessionInterface} from 'interfaces'
import logger from 'logger'

export type AuthenticationContext = {
    currentUserId: number
}

export type SessionContext = SessionInterface

export const composeContext = (
    contexts: Function[]
): BuildContextFn<Config, ModuleSessionInfo, ModuleContext> => (
    session: ModuleSessionInfo,
    currentContext: ModuleContext,
    moduleSessionInfo: ModuleSessionInfo
) =>
    contexts.reduce(
        (acc, ctx) => ({
            ...acc,
            ...ctx(session, currentContext, moduleSessionInfo),
        }),
        {}
    )

export const attachCurrentUserId = (
    session: SessionInterface
): {currentUserId: number} | object => {
    const authToken = session.req.headers[headers.AUTH_TOKEN]
    if (!authToken || typeof authToken !== 'string') {
        return {}
    }

    try {
        const payload = AuthHelper.decodeJWTToken<AuthTokenPayload>(authToken)

        if (!payload) {
            throw Error()
        }

        return {currentUserId: payload.userId}
    } catch (e) {
        logger.warn('Invalid JWT token')
    }

    return {}
}

export const attachSession = (session: SessionInterface): SessionContext => ({
    req: session.req,
    res: session.res,
})
