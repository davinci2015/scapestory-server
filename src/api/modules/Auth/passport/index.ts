/* eslint-disable camelcase */
import * as passport from 'passport'
import * as FacebookTokenStrategy from 'passport-facebook-token'
import * as GoogleTokenStrategy from 'passport-google-token'
import {Profile, VerifyFunction} from 'passport-facebook-token'
import {Request, Response} from 'express'
import environment from 'config/environment'

export interface FacebookAuthData {
    accessToken: string
    refreshToken: string
    profile?: Profile
}

export interface GoogleProfile {
    provider: string
    id: string
    displayName: string
    name: {
        familyName: string
        givenName: string
    }
    emails: {value: string}[]
    _json: {
        id: string
        email: string
        name: string
        given_name: string
        family_name: string
        picture: string
        locale: string
    }
}

export interface GoogleAuthData {
    accessToken: string
    refreshToken?: string
    profile: GoogleProfile
}

export interface FacebookInfo {
    [key: string]: string
}

export const authenticateFacebook = (
    req: Request,
    res: Response
): Promise<{data?: FacebookAuthData, info?: FacebookInfo}> => new Promise((resolve, reject) => {
    passport.authenticate(
        'facebook-token',
        {session: false},
        (err, data?: FacebookAuthData, info?: FacebookInfo) => {
            if (err) {
                reject(err)
            }

            resolve({data, info})
        }
    )(req, res)
})

export const authenticateGoogle = (
    req: Request,
    res: Response
): Promise<{data: GoogleAuthData}> => new Promise((resolve, reject) => {
    passport.authenticate('google-token', (err, data: GoogleAuthData) => {
        if (err) {
            reject(err)
        }

        resolve({data})
    })(req, res)
})

export const initPassport = () => {
    const FacebookTokenStrategyCallback: VerifyFunction = (
        accessToken,
        refreshToken,
        profile,
        done
    ) =>
        done(null, {
            accessToken,
            refreshToken,
            profile,
        })

    const GoogleTokenStrategyCallback = (
        accessToken: string,
        refreshToken: string,
        profile,
        done
    ) =>
        done(null, {
            accessToken,
            refreshToken,
            profile,
        })

    passport.use(
        new FacebookTokenStrategy(
            {
                clientID: environment.FACEBOOK_CLIENT_ID,
                clientSecret: environment.FACEBOOK_SECRET,
            },
            FacebookTokenStrategyCallback
        )
    )

    passport.use(
        new GoogleTokenStrategy.Strategy(
            {
                clientID: environment.GOOGLE_CLIENT_ID,
                clientSecret: environment.GOOGLE_SECRET,
            },
            GoogleTokenStrategyCallback
        )
    )
}
