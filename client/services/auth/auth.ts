import Cookies from 'universal-cookie'
import appConstants from 'appConstants'
import {IncomingMessage} from 'http'

export default {
    persistToken(token: string) {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_AUTH, token)
    },

    getToken(req?: IncomingMessage) {
        let cookieHeader
        if (req && req.headers) cookieHeader = req.headers.cookie
        return new Cookies(cookieHeader).get(appConstants.COOKIE_AUTH)
    }
}