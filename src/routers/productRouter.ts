//
//      Rota de produtos
//

import { Router, Request, Response, NextFunction } from 'express'
import { deleteVariation } from '../repositories/productRepository'
import { createNewVariation, createProduct, findProductsByShop, updateProduct, updateProductVariation } from '../services/productService'
import { uploadProductPicture } from '../services/uploadService'
import { badRequest, createHttpStatus, internalServerError, noContent, ok } from '../utils/httpStatus'
import { log } from '../utils/loggerUtil'
import { isProductFromShop, isVariationFromProduct } from '../utils/middlewares'
import { isNewProductValid, isNewVariationValid, isProductPatchValid, isVariationPatchValid } from '../validations/productValidation'
const router = Router()

const uploadMultiple = uploadProductPicture.array( 'images', 8 )

/**
 * POST -> Send images to S3 and return the file location
 */
router.post( '/upload', async ( req, res, next ) => {

    uploadMultiple( req, res, err => {

        if ( err ) return log( err.message, 'EVENT', 'UPLOAD', 'ERROR' )

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

    let errors = await isNewProductValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    body.shop = req.shop?._id

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
 * GET -> produto details
 */
router.get( '/:product_id', isProductFromShop, async ( req: Request, res: Response, next: NextFunction ) => {

    return res
        .status( ok.status )
        .send( req.product )
} )

/**
 * PATCH -> atualiza produto
 */
router.patch( '/:product_id', isProductFromShop, async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    const product_id = req.product?._id

    let errors = await isProductPatchValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const product = await updateProduct( product_id, body )

    if ( !product )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( product )
} )

/**
 * GET -> variação do produto
 */
router.get( '/:product_id/variation/:variation_id', isProductFromShop, isVariationFromProduct, async ( req: Request, res: Response, next: NextFunction ) => {

    if ( !req.product || !req.variation )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    req.product.variations = [req.variation]

    return res
        .status( ok.status )
        .send( req.product )
} )

/**
 * POST -> cria variação do produto
 */
router.post( '/:product_id/variation', isProductFromShop, async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    body.product_id = req.product?._id

    let errors = await isNewVariationValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const variation = await createNewVariation( body )

    if ( !variation )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( variation )
} )

/**
 * PATCH -> atualiza variação do produto
 */
router.patch( '/:product_id/variation/:variation_id', isProductFromShop, isVariationFromProduct, async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    const variation_id = req.params.variation_id

    let errors = await isVariationPatchValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const product = await updateProductVariation( variation_id, body )

    if ( !product )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( product )
} )

/**
 * DELETE -> Exclui variação do produto
 */
router.delete( '/:product_id/variation/:variation_id', isProductFromShop, isVariationFromProduct, async ( req: Request, res: Response, next: NextFunction ) => {

    if ( !req.product || !req.variation )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    const result = await deleteVariation( req.variation._id )

    if ( !result )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( result )
} )

/**
 * GET -> Retrieve all products for a given shop
 */
router.get( '/', async ( req: Request, res: Response, next: NextFunction ) => {

    const products = await findProductsByShop( req.shop?._id )

    if ( !products )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( products.length > 0 ? ok.status : noContent.status )
        .send( products )
} )

export { router as productRouter }
