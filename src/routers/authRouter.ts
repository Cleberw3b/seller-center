//
//      Authentication Router
//

import { Router, Request, Response, NextFunction } from 'express'
import { badRequest, createHttpStatus, internalServerError, ok } from '../utils/httpStatus'
import { activateUser, createUser, findUserByEmail, newPassword } from '../services/userService'
import { invalidToken, loginFail, userNotExists } from '../utils/errors/errors'
import { isNewUserValid } from '../validations/userValidation'
import { forgetPassword, isUserLoginValid, loginUser } from '../services/loginService'
import { isTokenValid } from '../services/tokenService'
import { isJWTTokenValid } from '../utils/cryptUtil'

const router = Router()

/**
 * POST -> Creates an account
 */
router.post( '/create', async ( req: Request, res: Response, next: NextFunction ) => {

    const { email, password } = req.body

    const errors = await isNewUserValid( email, password )

    if ( errors.length > 0 )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

    const user = await createUser( email, password )

    if ( !user )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    delete user?.password

    return res
        .status( ok.status )
        .send( user )
} )

/**
 * GET -> Activates an User
 */
router.get( '/activate/:token', async ( req: Request, res: Response, next: NextFunction ) => {

    const token = req.params.token

    const user = await activateUser( token )

    if ( !user )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, invalidToken ) )

    return res
        .status( ok.status )
        .send( await loginUser( user ) )
} )

/**
 * Post -> Verifies if can log in user
 */
router.post( '/login', async ( req: Request, res: Response, next: NextFunction ) => {

    const email = req.body.login
    const username = req.body.login
    const password = req.body.password

    let user = await isUserLoginValid( email, username, password )

    if ( !user )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, loginFail ) )

    return res
        .status( ok.status )
        .send( await loginUser( user ) )
} )

/**
 * PUT -> Verifies if can log in user
 */
router.put( '/logout', ( req: Request, res: Response, next: NextFunction ) => {

    return res
        .status( ok.status )
        .send( true )
} )

/**
 * get -> Verifies if can log in user
 */
router.get( '/forgotPassword/:email', async ( req: Request, res: Response, next: NextFunction ) => {

    const user = await findUserByEmail( req.params.email )

    if ( !user )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, userNotExists ) )

    const result = forgetPassword( user )

    if ( !result )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( { data: 'Email sent to reset password' } )
} )

/**
 * GET -> Verifies if the token is valid and return the user id
 */
router.get( '/resetPassword/:token', async ( req: Request, res: Response, next: NextFunction ) => {

    const token = await isTokenValid( req.params.token )

    if ( !token )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, invalidToken ) )

    return res
        .status( ok.status )
        .send( token.user_id )
} )

/**
 * POST -> Reset password
 */
router.post( '/resetPassword', async ( req: Request, res: Response, next: NextFunction ) => {

    const userId = req.body.user_id

    const password = req.body.new_password

    if ( !userId || !password )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest ) )

    const user = await newPassword( userId, password )

    if ( !user )
        return res
            .status( internalServerError.status )
            .send( createHttpStatus( internalServerError ) )

    return res
        .status( ok.status )
        .send( await loginUser( user ) )
} )

/**
 * get -> Verifies if a token still valid
 */
router.get( '/token/:token', ( req: Request, res: Response, next: NextFunction ) => {

    const result = isJWTTokenValid( req.params.token )

    return res
        .status( ok.status )
        .send( { isValid: result } )
} )

export { router as authRouter }
