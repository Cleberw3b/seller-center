//
//      Rota Health Check
//

import { Router } from 'express'
import { Request, Response, NextFunction } from 'express-serve-static-core'
import { ok } from '../utils/httpStatus'
const router = Router()

/**
 * GET -> verifica se o sistema está ativo respondendo com o tempo desde o último start 
 */
router.get( '/', ( req: Request, res: Response, next: NextFunction ) => {

    return res
        .status( ok.status )
        .send( {
            name: 'MY APP',
            uptime: process.uptime()
        } )
} )

export { router as healthCheckRouter }
