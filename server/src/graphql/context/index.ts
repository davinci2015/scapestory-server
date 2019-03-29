import {appConstants} from 'constants/appConstants'
import {AuthHelper} from 'utils/AuthHelper'
import {User} from 'db/models/User'
import {SessionInterface} from 'interfaces'

export type AuthenticationContext = {
    currentUser: User
}

export const contextBuilder = {
    authentication(session: SessionInterface) {
        let jwtPayload = null
        let user = null

        const authToken = session.req.headers[appConstants.HEADER_AUTH_TOKEN]
        if (!authToken || typeof authToken !== 'string') return

        try {
            jwtPayload = AuthHelper.decodeJWTToken(authToken)
            user = jwtPayload.user
        } catch (e) {
            console.log('Invalid jwt token')
        }

        return {currentUser: user}
    }
}