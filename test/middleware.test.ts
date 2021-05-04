import 'jest'
import { createRequest, createResponse, } from 'node-mocks-http'
import * as middlewares from '../src/utils/middlewares'
import { createHttpStatus, findErrorByStatus, internalServerError } from '../src/utils/httpStatus'

const request = createRequest()
const response = createResponse()
const next = jest.fn()

describe( 'Tests Middlewares', () => {

    it( 'A request with not found path, should call next', ( done ) => {

        middlewares.notFountMiddleware( request, response, next )

        expect( next ).toHaveBeenCalled()
        done()
    } )

    it( 'A request with error should response with error', async ( done ) => {

        const error = createHttpStatus( { status: 404, message: 'Not Found' } )

        const response = createResponse()

        middlewares.errorMiddleware( error, request, response, next )

        const res = createHttpStatus( findErrorByStatus( error.status ), error.message )
        const notAnError = findErrorByStatus( 0 )

        expect( notAnError ).toBe( internalServerError )
        expect( response._getStatusCode() ).toStrictEqual( error.status )
        expect( response._getStatusMessage() ).toStrictEqual( error.message )
        expect( response._getData() ).toStrictEqual( res )
        done()
    } )

    it( 'Tests corsMiddleware should have headers allowing origin', async ( done ) => {

        middlewares.corsMiddleware( request, response, next )

        expect( response._getHeaders()['access-control-allow-origin'] ).toStrictEqual( '*' )
        expect( response._getHeaders()['access-control-allow-methods'] ).toStrictEqual( 'GET, POST, PATCH, PUT, DELETE, OPTIONS' )
        expect( response._getHeaders()['access-control-allow-headers'] ).toStrictEqual( 'Origin, Accept, Content-Type, Authorization' )
        expect( next ).toHaveBeenCalled()
        done()
    } )

    it( 'Tests corsMiddleware should handle preflight', async ( done ) => {

        let _request = request
        _request.method = 'OPTIONS'

        middlewares.corsMiddleware( _request, response, next )

        expect( response._getStatusCode() ).toStrictEqual( 200 )
        expect( next ).toBeCalledTimes( 0 )
        done()
    } )

    it( 'TODO test for authMiddleware', async ( done ) => {

        middlewares.authMiddleware( request, response, next )

        expect( next ).toHaveBeenCalled()
        done()
    } )

    it( 'TODO test for loggerRequest', async ( done ) => {
        expect( middlewares.loggerResponse ).toBeTruthy()
        done()
    } )

    it( 'TODO test for loggerResponse', async ( done ) => {
        expect( middlewares.loggerResponse ).toBeTruthy()
        done()
    } )
} )
