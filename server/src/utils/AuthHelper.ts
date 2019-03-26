import * as bcrypt from 'bcrypt'
import * as moment from 'moment'
import * as jwt from 'jwt-simple'
import {User} from 'db/models/User'

export class AuthHelper {
    static checkPassword(password: string, encryptedPassword: string): boolean {
        return bcrypt.compareSync(password, encryptedPassword)
    }

    static createJWTToken(user: User): string {
        const payload = {user, iat: moment().unix()}
        return jwt.encode(payload, process.env.SECURITY_TOKEN_SECRET)
    }
}