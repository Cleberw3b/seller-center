import { Request, Response } from 'express'

import { createTenant, updateHub2bTenant, getHub2bTenant } from '../services/hub2bTenantService'
import { createHttpStatus, internalServerError, ok } from '../utils/httpStatus'

export default class TenantsController {
  public async create(request: Request, response: Response): Promise<Response> {
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

  public async update(request: Request, response: Response): Promise<Response> {
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

  public async show(request: Request, response: Response): Promise<Response> {
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
}
