//
//      Authentication Router
//

import { Router } from 'express'
import { Request, Response, NextFunction } from 'express-serve-static-core'
import { badRequest, createHttpStatus, ok } from '../utils/httpStatus'
import { activateUser, createUser } from '../services/userService'
import { invalidActivationToken, loginFail, userNotExists } from '../utils/errors/errors'
import { isNewUserValid } from '../utils/validations/userValidation'
import { forgetPassword, isUserLoginValid, loginUser } from '../services/loginService'

const router = Router()

router.get( '/test', async ( req: Request, res: Response, next: NextFunction ) => {

    return res
        .status( ok.status )
        .send( {} )
} )

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
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, errors ) )

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
            .send( createHttpStatus( badRequest, invalidActivationToken ) )

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
        .send( loginUser( user ) )
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
router.get( '/forgotPassword/:email', ( req: Request, res: Response, next: NextFunction ) => {

    const email = req.params.email

    const result = forgetPassword( email )

    if ( !result )
        return res
            .status( badRequest.status )
            .send( createHttpStatus( badRequest, userNotExists ) )

    return res
        .status( ok.status )
        .send( { data: 'Email sent to reset password' } )
} )

export { router as authRouter }
