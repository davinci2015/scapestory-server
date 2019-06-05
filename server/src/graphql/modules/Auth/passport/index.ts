import * as passport from 'passport'
import * as FacebookTokenStrategy from 'passport-facebook-token'
import {Profile, VerifyFunction} from 'passport-facebook-token'
import {Request, Response} from 'express'

export interface FacebookAuthData {
    accessToken: string
    refreshToken: string
    profile?: Profile
}

export interface FacebookInfo {
    [key: string]: string
}

export const authenticateFacebook =
    (req: Request, res: Response): Promise<{data?: FacebookAuthData, info?: FacebookInfo}> => {
        return new Promise((resolve, reject) => {
            passport.authenticate(
                'facebook-token',
                {session: false},
                (err, data?: FacebookAuthData, info?: FacebookInfo) => {
                    if (err) {
                        reject(err)
                    }

                    resolve({data, info})
                })(req, res)
        })
    }

export const initPassport = () => {
    const FacebookTokenStrategyCallback: VerifyFunction = (accessToken, refreshToken, profile, done) => done(null, {
        accessToken,
        refreshToken,
        profile
    })

    passport.use(new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID || '',
        clientSecret: process.env.FACEBOOK_SECRET || ''
    }, FacebookTokenStrategyCallback))
}