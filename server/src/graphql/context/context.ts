import {ModuleContext} from '@graphql-modules/core'
import {Context} from 'apollo-server-core'

import headers from 'constants/headers'
import {AuthHelper} from 'utils/AuthHelper'
import {SessionInterface} from 'interfaces'
import {Injector} from '@graphql-modules/di'

export type AuthenticationContext = {
    currentUserId: number
}

export type SessionContext = SessionInterface

export const composeContext = (
    contexts: ((
        session: SessionInterface,
        currentContext: ModuleContext,
        moduleSessionInfo: SessionInterface
    ) => Promise<Context> | Context)[]
) => (
    session: SessionInterface,
    currentContext: ModuleContext,
    moduleSessionInfo: SessionInterface
) => contexts.reduce(
    (
        acc: ModuleContext,
        ctx: (
            session: SessionInterface,
            currentContext: ModuleContext,
            moduleSessionInfo: SessionInterface
        ) => ModuleContext
    ) => ({
        ...acc,
        ...ctx(session, currentContext, moduleSessionInfo),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as {injector: Injector, [x: string]: any }
)

export const attachCurrentUserId = (
    session: SessionInterface): {currentUserId: number} | object => {
    const authToken = session.req.headers[headers.AUTH_TOKEN]
    console.log('attachCurrentUserId')
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

export const attachSession = (session: SessionInterface): SessionContext => {
    console.log('attachSession')
    return {
        req: session.req,
        res: session.res,
    }
}
