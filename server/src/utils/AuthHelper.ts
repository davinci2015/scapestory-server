import * as moment from 'moment'
import {compareSync, hashSync} from 'bcrypt'
import {encode, decode} from 'jwt-simple'

export interface JWTTokenPayload {
    userId: number
    iat: number
}

export class AuthHelper {
    static checkPassword(password: string, encryptedPassword: string) {
        return compareSync(password, encryptedPassword)
    }

    static cryptPassword(rawPassword: string, rounds: number = 10) {
        return hashSync(rawPassword, rounds)
    }

    static createJWTToken(userId: number): string {
        const payload = {userId, iat: moment().unix()}
        return encode(payload, process.env.SECURITY_TOKEN_SECRET || '')
    }

    static decodeJWTToken(token: string): JWTTokenPayload | null {
        return decode(token, process.env.SECURITY_TOKEN_SECRET || '')
    }
}
