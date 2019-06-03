import Cookies from 'universal-cookie'
import appConstants from 'appConstants'

export default {
    persistToken(token: string) {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_AUTH, token)
    }
}