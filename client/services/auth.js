import Cookies from 'universal-cookie'
import appConstants from '../appConstants'
const cookie = new Cookies()

const setToken = (token) => cookie.set(appConstants.COOKIE_AUTH, token)
const getToken = () => cookie.get(appConstants.COOKIE_AUTH)

export default {
    setToken,
    getToken
}