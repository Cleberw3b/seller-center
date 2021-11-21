import { Router } from 'express'
import { validatePayloadCreateTenant, validatePayloadUpdateTenant, validatePayloadGetTenant } from '../utils/middlewares'
import { Request, Response } from 'express'
import { createTenant, updateHub2bTenant, getHub2bTenant } from '../services/hub2bTenantService'
import { createHttpStatus, internalServerError, ok } from '../utils/httpStatus'

const router = Router()

/**
 * POST -> Creates a tenant (Sellers)
 */
 router.post('/create', validatePayloadCreateTenant,
    async (request: Request, response: Response) => {
        const body = request.body
        const tenant = await createTenant( body )
      
        if ( !tenant )
            return response
                .status( internalServerError.status )
                .send( createHttpStatus( internalServerError ) )
      
        return response
            .status( ok.status )
            .send( tenant )
    }
)

/**
 * PUT -> Update a tenant (Seller)
 */
 router.put('/:idTenant', validatePayloadUpdateTenant,
    async (request: Request, response: Response) => {
        const body = request.body
        body.idTenant = request.params.idTenant
        const tenant = await updateHub2bTenant( body )
      
        if ( !tenant )
            return response
                .status( internalServerError.status )
                .send( createHttpStatus( internalServerError ) )
      
        return response
            .status( ok.status )
            .send( tenant )
    }
)

/**
 * GET -> Retrieve tenant (Seller)
 */
 router.get('/:idTenant', validatePayloadGetTenant,
    async (request: Request, response: Response) => {
        const idTenant = request.params.idTenant
        const tenant = await getHub2bTenant( idTenant )
      
        if ( !tenant )
            return response
                .status( internalServerError.status )
                .send( createHttpStatus( internalServerError ) )
      
        return response
            .status( ok.status )
            .send( tenant )
    }
)

export { router as tenantRouter }