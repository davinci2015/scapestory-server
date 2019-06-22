import Cookies from 'universal-cookie'
import appConstants from 'appConstants'
import {Request} from 'node-fetch'

export default {
    persistToken(token: string) {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_AUTH, token)
    },

    getToken(req?: Request) {
        const cookieHeader = req ? req.headers.get('cookie') : undefined
        const cookies = new Cookies(cookieHeader)
        console.log('cookies', cookies.get(appConstants.COOKIE_AUTH))
        return cookies.get(appConstants.COOKIE_AUTH)
    }
}