//
//      Rota de produtos
//

import { Router, Request, Response, NextFunction } from 'express'
import { createProduct, findProduct, findProductsByShop } from '../services/productService'
import { uploadProductPicture } from '../services/uploadService'
import { badRequest, createHttpStatus, internalServerError, noContent, notFound, ok } from '../utils/httpStatus'
import { isProductValid } from '../validations/productValidation'
const router = Router()

const uploadMultiple = uploadProductPicture.array( 'images', 10 )

/**
 * POST -> Send images to S3 and return the file location
 */
router.post( '/upload', async ( req, res, next ) => {

    uploadMultiple( req, res, err => {
        if ( err ) {
            console.log( "UPLOAD ERROR", err )
            next( createHttpStatus( internalServerError, err ) )
        }

        const filesLocation: string[] = []

        if ( Array.isArray( req.files ) )
            req.files.forEach( ( file: any ) => {
                filesLocation.push( file.location )
            } )

        return res.send( {
            message: 'Successfully uploaded ' + req.files?.length + ' files!',
            urls: filesLocation
        } )
    } )
} )

/**
 * POST -> cria um novo produto vinculado a loja
 */
router.post( '/', async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    let errors = await isProductValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const product = await createProduct( body )

    if ( !product )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( product )
} )

/**
 * PATCH -> atualiza produto
 */
router.post( '/', async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    let errors = await isProductValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const product = await createProduct( body )

    if ( !product )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( product )
} )

/**
 * GET -> verifica se o sistema está ativo respondendo com o tempo desde o último start 
 */
router.get( '/:product_id', async ( req: Request, res: Response, next: NextFunction ) => {

    const productId = req.params.product_id

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

    const products = await findProductsByShop( req.shop_id )

    if ( !products )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( products.length > 0 ? ok.status : noContent.status )
        .send( products )
} )

export { router as productRouter }
