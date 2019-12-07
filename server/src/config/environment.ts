import * as dotenv from 'dotenv'
import logger from 'logger'

dotenv.config()

interface EnvironmentVariables {
    DB_HOST: string
    DB_USER: string
    DB_PASS: string
    DB_NAME: string
    ENVIRONMENT: string
    SECURITY_TOKEN_SECRET: string
    SECURITY_TOKEN_STATIC: string
    FACEBOOK_CLIENT_ID: string
    FACEBOOK_SECRET: string
    GOOGLE_SECRET: string
    GOOGLE_CLIENT_ID: string
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
}

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
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
} as EnvironmentVariables

const checkVariables = (variables: EnvironmentVariables) => {
    for (const x in variables) {
        if (!variables[x]) {
            logger.warn(`Environment variable ${x} is missing!`)
        }
    }
}

checkVariables(environment)

export default environment
