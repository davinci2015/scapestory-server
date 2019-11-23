import Cookies from 'universal-cookie'
import appConstants from 'appConstants'
import {IncomingHttpHeaders} from 'http2'
import {addYears} from 'date-fns'

export default {
    persistAuthToken(token: string) {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_AUTH, token, {
            expires: addYears(Date.now(), 10),
            path: '/',
        })
    },

    getAuthToken(headers?: IncomingHttpHeaders) {
        const cookies = headers ? new Cookies(headers.cookie) : new Cookies()
        return cookies.get(appConstants.COOKIE_AUTH)
    },

    getVisitorId(headers?: IncomingHttpHeaders) {
        const cookies = headers ? new Cookies(headers.cookie) : new Cookies()
        return cookies.get(appConstants.COOKIE_VISITOR_ID)
    },

    persistVisitorId(visitorId: string) {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_VISITOR_ID, visitorId, {
            expires: addYears(Date.now(), 10),
            path: '/',
        })
    },
}
