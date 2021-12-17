//
//      Rota de tamanhos
//

import { Router, Request, Response, NextFunction } from 'express'
import { findOrdersByShop, sendTracking, retrieveTracking } from '../services/orderService'
import { createHttpStatus, internalServerError, ok } from '../utils/httpStatus'
const router = Router()

/**
 * GET -> lista de tamanhos 
 */
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {

    const orders = await findOrdersByShop(req.shop?._id.toString())

    if (!orders)
        return res
            .status(internalServerError.status)
            .send(createHttpStatus(internalServerError))

    return res
        .status(ok.status)
        .send(orders)
})

router.post('/:id/tracking', async (req: Request, res: Response, next: NextFunction) => {

    const tracking = await sendTracking(req.params.id, req.body)

    if (!tracking)
        return res
            .status(internalServerError.status)
            .send(createHttpStatus(internalServerError))

    return res
        .status(ok.status)
        .send(tracking)
})

router.get('/:id/tracking', async (req: Request, res: Response, next: NextFunction) => {
    
    const tracking = await retrieveTracking(req.params.id)

    if (!tracking)
        return res
            .status(internalServerError.status)
            .send(createHttpStatus(internalServerError))

    return res
        .status(ok.status)
        .send(tracking)
})

/**
 * POST -> Order from HUB2B
 */
// router.post( '/', async ( req: Request, res: Response, next: NextFunction ) => {

//     const body = req.body

//     if ( !body )
//         return res
//             .status( internalServerError.status )
//             .send( createHttpStatus( internalServerError ) )

//     return res
//         .status( ok.status )
//         .send( body )
// } )

export { router as orderRouter }
