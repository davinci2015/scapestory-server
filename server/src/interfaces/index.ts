import * as express from 'express'

export interface SessionInterface {
    req: express.Request;
    res: express.Response;
}