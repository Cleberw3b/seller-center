//
//      Rota de produtos
//

import { Router } from 'express'
import { Request, Response, NextFunction } from 'express-serve-static-core'
import { createProduct, findProduct, findProductsByShop } from '../services/productService'
import { upload } from '../services/uploadService'
import { invalidUserReference } from '../utils/errors/errors'
import { badRequest, createHttpStatus, internalServerError, noContent, notFound, ok, unauthorized } from '../utils/httpStatus'
import { isNewProductValid, userCanAccessShop } from '../validations/productValidation'
const router = Router()

const uploadMultiple = upload.array( 'images', 10 )
/**
 * POST -> cria um novo produto vinculado a loja
 */
router.post( '/', async ( req: Request, res: Response, next: NextFunction ) => {

    const userId = req.headers.user_id

    const shopId = req.headers.shop_id

    if ( !await userCanAccessShop( userId, shopId ) )
        return res
            .status( unauthorized.status )
            .send( createHttpStatus( unauthorized, [invalidUserReference] ) )

    uploadMultiple( req, res, async err => {
        if ( err ) {

            console.log( err )

            return res
                .status( badRequest.status )
                .send( createHttpStatus( badRequest, err ) )
        }
        const body = req.body

        let errors = await isNewProductValid( body )

        if ( errors.length > 0 )
            return res
                .status( badRequest.status )
                .send( createHttpStatus( badRequest, errors ) )

        const filesLocation: string[] = []

        if ( Array.isArray( req.files ) )
            req.files.forEach( ( file: any ) => {
                filesLocation.push( file.location )
            } )

        body.images = filesLocation

        body.shopId = shopId

        const product = await createProduct( body )

        if ( !product )
            return res
                .status( internalServerError.status )
                .send( createHttpStatus( internalServerError ) )

        return res
            .status( ok.status )
            .send( product )
    } )
} )

/**
 * GET -> verifica se o sistema está ativo respondendo com o tempo desde o último start 
 */
router.get( '/:product_id', async ( req: Request, res: Response, next: NextFunction ) => {

    const productId = req.params.product_id

    const userId = req.headers.user_id

    const shopId = req.headers.shop_id

    if ( !await userCanAccessShop( userId, shopId ) )
        return res
            .status( unauthorized.status )
            .send( createHttpStatus( unauthorized, [invalidUserReference] ) )

    const product = await findProduct( productId )

    if ( !product )
        return res
            .status( notFound.status )
            .send( createHttpStatus( notFound ) )

    return res
        .status( ok.status )
        .send( product )
} )

/**
 * GET -> Retrieve all products for a given shop
 */
router.get( '/', async ( req: Request, res: Response, next: NextFunction ) => {

    const userId = req.headers.user_id

    const shopId = req.headers.shop_id

    if ( !await userCanAccessShop( userId, shopId ) )
        return res
            .status( unauthorized.status )
            .send( createHttpStatus( unauthorized, [invalidUserReference] ) )

    const products = await findProductsByShop( shopId )

    if ( !products )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( products.length > 0 ? ok.status : noContent.status )
        .send( products )
} )

export { router as productRouter }
