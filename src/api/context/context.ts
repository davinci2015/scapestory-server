import headers from 'constants/headers'
import {AuthHelper, AuthTokenPayload} from 'utils/AuthHelper'
import {SessionInterface} from 'interfaces'
import logger from 'logger'

export type AuthenticationContext = {
    currentUserId: number
}

export type SessionContext = SessionInterface

export const attachCurrentUserId = (session: SessionInterface): {currentUserId: number} | null => {
    const authToken = session.req.headers[headers.AUTH_TOKEN]
    if (!authToken || typeof authToken !== 'string') {
        return null
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

    return null
}

export const attachSession = (session: SessionInterface): SessionContext => ({
    req: session.req,
    res: session.res,
})
