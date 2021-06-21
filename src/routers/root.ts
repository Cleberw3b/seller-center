//
//      Rota Raiz
//

import { Router, Request, Response, NextFunction } from 'express'
import { permanentRedirect } from '../utils/httpStatus'
const router = Router()

/**
 * GET -> Redirecionando para o health check.
 */
router.get( '/', async ( req: Request, res: Response, next: NextFunction ) => {

    return res.redirect( permanentRedirect.status, '/healthcheck' )

} )

export { router as rootRouter }
