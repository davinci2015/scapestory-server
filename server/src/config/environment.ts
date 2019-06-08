import * as dotenv from 'dotenv'
import logger from 'logger'

dotenv.config()

const environment = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    ENVIRONMENT: process.env.ENVIRONMENT,
    SECURITY_TOKEN_SECRET: process.env.SECURITY_TOKEN_SECRET,
    SECURITY_TOKEN_STATIC: process.env.SECURITY_TOKEN_STATIC,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
} as Readonly<{[key: string]: string}>

const checkVariables = (variables: {[key: string]: string | undefined}) => {
    for (const x in variables) {
        if (!variables[x]) {
            logger.warn(`Environment variable ${x} is missing!`)
        }
    }
}

checkVariables(environment)

export default environment