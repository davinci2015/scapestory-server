import * as dotenv from 'dotenv'
import logger from 'logger'

dotenv.config()

interface EnvironmentVariables {
    DATABASE_URL: string
    ENVIRONMENT: string
    SECURITY_TOKEN_SECRET: string
    FACEBOOK_CLIENT_ID: string
    FACEBOOK_SECRET: string
    GOOGLE_SECRET: string
    GOOGLE_CLIENT_ID: string
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
    EMAIL_SENDER: string
    HOST: string
    SENDGRID_API_KEY: string
}

const environment = {
    DATABASE_URL: process.env.DATABASE_URL,
    ENVIRONMENT: process.env.ENVIRONMENT,
    SECURITY_TOKEN_SECRET: process.env.SECURITY_TOKEN_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    HOST: process.env.HOST,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
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
