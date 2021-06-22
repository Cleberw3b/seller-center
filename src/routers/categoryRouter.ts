//
//      Rota de categoria
//

import { Router, Request, Response, NextFunction } from 'express'
import { getAllCategories, getAllSubCategories } from '../services/categoryService'
import { badRequest, createHttpStatus, ok } from '../utils/httpStatus'
const router = Router()

/**
 * GET -> lista de categorias 
 */
router.get( '/list', async ( req: Request, res: Response, next: NextFunction ) => {

    return res
        .status( ok.status )
        .send( await getAllCategories() )
} )

/**
 * GET -> lista de sub categorias
 */
router.get( '/:category_code/subcategory', async ( req: Request, res: Response, next: NextFunction ) => {

    const category_code = parseInt( req.params.category_code )

    if ( isNaN( category_code ) )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest ) )

    else return res
        .status( ok.status )
        .send( await getAllSubCategories( category_code ) )

} )

export { router as categoryRouter }
