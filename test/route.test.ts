import 'jest'
import request from "supertest"
import app from '../src/expressConfig'

describe( 'Default routes', () => {

    it( 'Should redirect root and get status 302', async ( done ) => {

        const response = await request( app ).get( "/" )
        expect( response.status ).toBe( 302 )
        expect( response.headers.location ).toStrictEqual( '/healthcheck' )
        done()
    } )

    it( 'Should return status 200 and name MY APP', async ( done ) => {

        const response = await request( app ).get( "/healthcheck" )
        expect( response.status ).toBe( 200 )
        expect( response.body.name ).toStrictEqual( 'MY APP' )
        done()
    } )
} )
