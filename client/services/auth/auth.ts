import Cookies from 'universal-cookie'
import appConstants from 'appConstants'
import {IncomingHttpHeaders} from 'http2';

export default {
    persistToken(token: string) {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_AUTH, token)
    },

    getToken(headers?: IncomingHttpHeaders) {
        const cookies = headers ? new Cookies(headers.cookie) : new Cookies()
        return cookies.get(appConstants.COOKIE_AUTH)
    }
}