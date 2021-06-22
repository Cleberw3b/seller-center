//
//      Rota de bancos
//

import { Router, Request, Response, NextFunction } from 'express'
import { BANKS } from '../models/listaBancosBR'
import { ok } from '../utils/httpStatus'
const router = Router()

/**
 * GET -> lista de bancos 
 */
router.get( '/all', async ( req: Request, res: Response, next: NextFunction ) => {

    return res
        .status( ok.status )
        .send( BANKS )
} )

export { router as bankRouter }
