import {Request, Response} from 'express'

export interface SessionInterface {
    req: Request
    res: Response
}
