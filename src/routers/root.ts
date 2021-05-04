//
//      Rota Raiz
//

import { Router } from 'express'
import { Request, Response, NextFunction } from 'express-serve-static-core'
import { permanentRedirect } from '../utils/httpStatus'
const router = Router()

/**
 * GET -> Redirecionando para o health check.
 */
router.get( '/', ( req: Request, res: Response, next: NextFunction ) => {

    return res.redirect( permanentRedirect.status, '/healthcheck' )

} )

export { router as rootRouter }
