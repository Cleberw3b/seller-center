//
//      Account Router
//

import { Router } from 'express'
import { Request, Response, NextFunction } from 'express-serve-static-core'
import { createAddress, createBankInfo, createPersonalInfo, createShopInfo, getAccount } from '../services/accountService'
import { badRequest, createHttpStatus, internalServerError, ok } from '../utils/httpStatus'
import { isNewAddressValid, isNewBankInfoValid, isNewPersonalInfoValid, isNewShopInfoValid } from '../validations/accountValidation'

const router = Router()

/**
 * Post -> Creates personal information for an User
 */
router.post( '/personalInfo', async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    body.userId = req.headers.userId

    let errors = await isNewPersonalInfoValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const personalInfo = await createPersonalInfo( body )

    if ( !personalInfo )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( personalInfo )
} )

/**
 * Post -> Create address for an User
 */
router.post( '/address', async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    body.userId = req.headers.userId

    let errors = await isNewAddressValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const address = await createAddress( body )

    if ( !address )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( address )
} )

/**
 * Post -> Create shop info for an User
 */
router.post( '/shopInfo', async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    body.userId = req.headers.userId

    let errors = await isNewShopInfoValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const shopInfo = await createShopInfo( body )

    if ( !shopInfo )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( shopInfo )
} )

/**
 * Post -> Create bank info for an User
 */
router.post( '/bankInfo', async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    body.userId = req.headers.userId

    let errors = await isNewBankInfoValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const bankInfo = await createBankInfo( body )

    if ( !bankInfo )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( bankInfo )
} )

/**
 * GET -> Account Details
 */
router.get( '/detail', async ( req: Request, res: Response, next: NextFunction ) => {

    const userId = req.headers.userId

    const account = await getAccount( userId )

    if ( !account )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( account )
} )

export { router as accountRouter }
