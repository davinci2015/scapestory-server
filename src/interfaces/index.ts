import {Request, Response} from 'express'

export interface SessionInterface {
    req: Request
    res: Response
}

export interface Pagination {
    limit: number
    cursor?: string
}
