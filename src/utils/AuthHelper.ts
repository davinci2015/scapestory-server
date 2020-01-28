import * as moment from 'moment'
import {compareSync, hashSync} from 'bcrypt'
import {encode, decode} from 'jwt-simple'
import environment from 'config/environment'

export interface AuthTokenPayload {
    userId: number
    iat: number
}

export interface EmailConfirmationPayload {
    email: string
    code: string
    iat: number
}

export class AuthHelper {
    static checkPassword(password: string, encryptedPassword: string) {
        return compareSync(password, encryptedPassword)
    }

    static cryptPassword(rawPassword: string, rounds: number = 10) {
        return hashSync(rawPassword, rounds)
    }

    static createJWTToken(payload: {[key: string]: string | number}): string {
        const load = {...payload, iat: moment().unix()}
        return encode(load, environment.SECURITY_TOKEN_SECRET)
    }

    static createAuthToken(userId: number) {
        return AuthHelper.createJWTToken({userId})
    }

    static createEmailConfirmationToken(email: string, code: string) {
        return AuthHelper.createJWTToken({email, code})
    }

    static decodeJWTToken<PayloadType>(token: string): PayloadType | null {
        return decode(token, environment.SECURITY_TOKEN_SECRET)
    }
}
