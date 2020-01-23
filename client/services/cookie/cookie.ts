import Cookies from 'universal-cookie'
import appConstants from 'appConstants'
import {IncomingHttpHeaders} from 'http2'
import {addYears} from 'date-fns'

const path = '/'

export default {
    persistAuthToken(token: string) {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_AUTH, token, {
            expires: addYears(Date.now(), 10),
            path,
        })
    },

    removeAuthToken() {
        const cookies = new Cookies()
        cookies.remove(appConstants.COOKIE_AUTH, {path})
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
