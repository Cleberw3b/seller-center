import 'jest'
import supertest from 'supertest'
import app from "../src/expressConfig"
import { User } from '../src/models/account'
import { ok } from '../src/utils/httpStatus'
import { USER_MOCK_1, USER_MOCK_NULL } from './mocks/user.mock'

const request = supertest( app )

describe( 'Authentication Router', () => {

    it( 'Should create new user', async ( done ) => {

        const response = await request
            .post( '/auth/create' )
            .send( USER_MOCK_1 )

        const newUser: User = response.body

        expect( response.status ).toStrictEqual( ok.status )
        expect( newUser.email ).toStrictEqual( 'example@email.com' )
        expect( newUser.username ).toBeNull()
        expect( newUser.password ).toBeTruthy()
        expect( newUser.isActive ).toBeTruthy()
        expect( newUser.role ).toStrictEqual( 'seller' )
        expect( newUser._id ).toBeTruthy()
        done()
    } )

    it( 'Should ...', async ( done ) => {

        const response = await request
            .post( '/auth' )
            .send( USER_MOCK_NULL )

        const expected = USER_MOCK_NULL
    } )
} )
