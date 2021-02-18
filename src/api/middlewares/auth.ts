import logger from 'logger'

import headers from 'constants/headers'
import {AuthHelper, AuthTokenPayload} from 'utils/AuthHelper'
import {GlobalContext} from 'api/modules/App'

export const attachCurrentUserId = ({context}: {context: GlobalContext}, next) => {
    const authToken = context.req.headers[headers.AUTH_TOKEN]

    if (!authToken || typeof authToken !== 'string') {
        return next()
    }

    try {
        const payload = AuthHelper.decodeJWTToken<AuthTokenPayload>(authToken)

        if (!payload) {
            throw Error()
        }

        context.currentUserId = payload.userId
    } catch (e) {
        logger.warn('Invalid JWT token')
        return next()
    }

    return next()
}
