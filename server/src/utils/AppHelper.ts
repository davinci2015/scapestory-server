import {appConstants} from 'constants/appConstants'

export class AppHelper {
    static isDevelopment = () => process.env.ENVIRONMENT === appConstants.ENV_DEVELOP
}