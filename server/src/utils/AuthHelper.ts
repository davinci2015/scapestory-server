import * as bcrypt from 'bcrypt'
import * as moment from 'moment'
import * as jwt from 'jwt-simple'

export interface JWTTokenPayload {
    userId: number
    iat: number
}

export class AuthHelper {
    static checkPassword(password: string, encryptedPassword: string): boolean {
        return bcrypt.compareSync(password, encryptedPassword)
    }

    static cryptPassword(rawPassword: string, rounds: number = 10): string {
        return bcrypt.hashSync(rawPassword, rounds)
    }

    static createJWTToken(userId: number): string {
        const payload = {userId, iat: moment().unix()}
        return jwt.encode(payload, process.env.SECURITY_TOKEN_SECRET || '')
    }

    static decodeJWTToken(token: string): JWTTokenPayload | null {
        return jwt.decode(token, process.env.SECURITY_TOKEN_SECRET || '')
    }
}
