//
//      Account Router
//

import { Router, Request, Response, NextFunction } from 'express'
import { createAddress, createBankInfo, createContact, createPersonalInfo, createShopInfo, getAccount } from '../services/accountService'
import { badRequest, createHttpStatus, internalServerError, ok } from '../utils/httpStatus'
import { isContactValid, isAddressValid, isBankInfoValid, isPersonalInfoValid, isShopInfoValid } from '../validations/accountValidation'

const router = Router()

/**
 * Post -> Creates personal information for an User
 */
router.post( '/personalInfo', async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    body.userId = req.user?._id

    let errors = await isPersonalInfoValid( body )

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

    body.userId = req.user?._id

    let errors = await isAddressValid( body )

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

    body.userId = req.user?._id

    let errors = await isShopInfoValid( body )

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

    body.userId = req.user?._id

    let errors = await isBankInfoValid( body )

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
 * Post -> Create contact for an User
 */
router.post( '/contact', async ( req: Request, res: Response, next: NextFunction ) => {

    const body = req.body

    body.userId = req.user?._id

    let errors = await isContactValid( body )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const contact = await createContact( body )

    if ( !contact )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( contact )
} )

/**
 * GET -> Account Details
 */
router.get( '/decode', async ( req: Request, res: Response, next: NextFunction ) => {

    return res
        .status( ok.status )
        .send( req.user )
} )

/**
 * GET -> Account Details
 */
router.get( '/detail', async ( req: Request, res: Response, next: NextFunction ) => {

    const account = await getAccount( req.user?._id )

    if ( !account )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( account )
} )

export { router as accountRouter }
