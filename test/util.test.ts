import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { findError, voidError } from '../src/utils/errors/errors'
import * as util from '../src/utils/util'


describe( 'Tests util', () => {

    it( 'Tests sleep function', async ( done ) => {
        await util.sleep()
        done()
    } )

    it( 'Tests getFunctionName', async ( done ) => {
        let functionName
        const func = () => functionName = util.getFunctionName()
        func()
        expect( functionName ).toEqual( 'func' )
        done()
    } )

    it( 'Tests findError', async ( done ) => {
        const error = findError( 0 )
        expect( error ).toStrictEqual( voidError )
        done()
    } )

    it( 'Tests formatDAte', async ( done ) => {
        const timeStamp = 1577883600000

        const formated = util.formatDate( timeStamp )

        expect( formated ).toBe( '2020-01-01' )
        done()
    } )

    it( 'Tests nowIsoDate ', async ( done ) => {

        expect( util.nowIsoDate().length ).toEqual( 24 )
        done()
    } )

    it( 'Tests nowInSeconds', async ( done ) => {

        expect( util.nowInSeconds() ).toBeGreaterThan( 1610025657 )
        done()
    } )

    it( 'Tests getRandomFromList with empty array', async ( done ) => {

        const list: [] = []

        const result = util.getRandomFromList( list )

        expect( result ).toBeNull()

        done()
    } )

    it( 'Tests getRandomFromList with list', async ( done ) => {

        const list: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        const result = util.getRandomFromList( list )

        const expected = list.some( item => item === result )

        expect( expected ).toBeTruthy()
        done()
    } )

    it( 'Tests logAxiosError ', async ( done ) => {

        const url = 'https://'

        const data = { message: util.nowInSeconds() + " represents " + util.nowIsoDate() + " in seconds." }

        const headers = { 'Content-Type': 'application/json' }

        const config: AxiosRequestConfig = {
            url,
            data,
            headers
        }

        const response: AxiosResponse = {
            config: {},
            data,
            headers,
            status: 200,
            statusText: 'ok'
        }

        const error: AxiosError = {
            config: config,
            code: '200',
            request: {},
            response: response,
            isAxiosError: true,
            message: 'test',
            name: 'test',
            toJSON: () => config
        }

        util.logAxiosError( error )
        done()
    } )

    it( 'Tests prettyFormat ', async ( done ) => {

        util.prettyFormat( { message: "Hi there, I'm a robot!" } )
        done()
    } )

} )
