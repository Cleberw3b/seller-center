import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
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
    // Allow Origins
    res.header( 'Access-Control-Allow-Origin', '*' )
    // Allow Methods
    res.header( 'Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS' )
    // Allow Headers
    res.header( 'Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization' )
    // Handle preflight, it must return 200
    if ( req.method === 'OPTIONS' ) {
        // Stop the middleware chain
        return res.status( 200 ).end()
    }
    // Call next middleware 
    next()
}

/**
 * Middleware to handle authorization
 */
export const authMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {

    // get token from request header Authorization
    const token = req.headers.authorization

    // Catch the JWT Expired or Invalid errors
    if ( !token || !isTokenValid( token ) ) {
        next( createHttpStatus( unauthorized ) )
        return
    }

    const userDecoded = decodeJWT( token )

    if ( !userDecoded ||
        typeof userDecoded === "string" ||
        !userDecoded.data ||
        typeof userDecoded.data === "string" ) {
        next( createHttpStatus( internalServerError ) )
        return
    }

    if ( !userDecoded.data.isActive ) {
        next( createHttpStatus( unauthorized ) )
        return
    }

    const { _id } = userDecoded.data

    req.headers.user_id = _id

    // Call next middleware
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
