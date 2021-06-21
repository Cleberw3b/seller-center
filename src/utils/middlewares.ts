import { Request, Response, NextFunction } from 'express'
import { findUserById } from '../repositories/userRepository'
import { findShop } from '../services/accountService'
import { findById } from '../services/userService'
import { decodeJWT, isTokenValid } from './cryptUtil'
import { notFound, createHttpStatus, HttpStatusResponse, unauthorized, internalServerError } from './httpStatus'
import { logger, log } from './loggerUtil'

/**
 * Middleware para capturar status 404 e criar error
 */
export const notFountMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
    next( createHttpStatus( notFound ) )
}

/**
 * Exports middleware para tratar erros internos do servidor express
 */
export const errorMiddleware = ( error: HttpStatusResponse, req: Request, res: Response, next: NextFunction ) => {
    if ( res.headersSent ) return

    res.statusMessage = error.message

    log( res.statusMessage, 'EVENT', 'Error Middleware', 'ERROR' )

    try {
        return res
            .status( error.status )
            .send( error )

    } catch ( error ) {
        if ( error instanceof Error ) {
            console.error( error.message )
            log( error.message, 'EVENT', 'Error Middleware', 'CRITICAL' )
        }
    }
}

/**
 * Middleware function to handle authorization
 */
export const corsMiddleware = ( req: Request, res: Response, next: NextFunction ) => {

    res.header( 'Access-Control-Allow-Origin', '*' )

    res.header( 'Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS' )

    res.header( 'Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, shop_id' )

    if ( req.method === 'OPTIONS' ) {
        return res.status( 200 ).end()
    }

    next()
}

/**
 * Middleware to handle authorization
 */
export const authMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {

    // get token from request header Authorization
    const token = req.headers.authorization

    // Catch the JWT Expired or Invalid errors
    if ( !token || !isTokenValid( token ) )
        return next( createHttpStatus( unauthorized ) )

    const userDecoded = decodeJWT( token )

    if ( !userDecoded ||
        typeof userDecoded === "string" ||
        !userDecoded.data ||
        typeof userDecoded.data === "string" ) {
        return next( createHttpStatus( internalServerError ) )
    }

    const user = await findById( userDecoded.data._id )

    if ( !user || !user.isActive )
        return next( createHttpStatus( unauthorized ) )

    req.user = user

    next()
}

/**
 * Middleware para logar as requests
 */
export const loggerRequest = logger( 'from :remote-addr - :method :url HTTP/:http-version', {
    immediate: true,
    stream: {
        write: ( message: string ) => {
            log( message.trim(), 'REQUEST' )
        }
    }
} )

/**
 * Middleware para logar os responses
 */
export const loggerResponse = logger( 'to :remote-addr - STATUS :status in :response-time ms', {
    stream: {
        write: ( message: string ) => {
            log( message.trim(), 'RESPONSE' )
        }
    }
} )

/**
 * Verifies whether the user can access shop
 *
 * @param req.headers.shop_id
 * @param req.user._id
 * @returns an unauthorized response in negative case
 */
export const userCanAccessShop = async ( req: Request, res: Response, next: NextFunction ) => {

    const shopId = req.headers.shop_id

    const userId = req.user?._id

    if ( !userId || !shopId ) return next( createHttpStatus( unauthorized ) )

    const [user, shop] = await Promise.all( [findUserById( userId ), findShop( shopId )] )

    if ( !user || !shop ) return next( createHttpStatus( unauthorized ) )

    if ( !user._id.equals( shop.userId ) ) return next( createHttpStatus( unauthorized ) )

    req.shop_id = shop._id

    next()
}
