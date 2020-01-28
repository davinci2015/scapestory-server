import environments from 'constants/environments'

export class AppHelper {
    static isDevelopment = () =>
        process.env.ENVIRONMENT === environments.DEVELOP
}
