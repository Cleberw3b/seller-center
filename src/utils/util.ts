import { AxiosError, AxiosResponse } from 'axios'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { isDate, isExists, parse } from 'date-fns'
import { log } from './loggerUtil'

/**
 * Call it inside an async function and it will sleep
 * 
 * @param ms - milliseconds
 */
export const sleep = ( ms: number = 1 ) => {
    return new Promise( ( resolve ) => {
        setTimeout( resolve, ms )
    } )
}

/**
 * Returns the callee name
 * 
 * @param depth - depth
 */
export const getFunctionName = ( depth: number = 1 ) => {
    const error = new Error()
    if ( error.stack ) {
        // tslint:disable-next-line:max-line-length
        return ( ( ( ( error.stack.split( 'at ' ) || [] )[1 + depth] || '' ).match( /(^|\.| <| )(.*[^(<])( \()/ ) || [] )[2] || '' ).split( '.' ).pop()
    }
    return 'NULL'
}

/**
 * 
 * @param timestamp 
 * @returns this format 2020-05-01
 */
export const formatDate = ( timestamp: number ) => {
    const date = new Date( timestamp )
    const year = date.getFullYear()
    const month = date.getMonth() < 10 ? '0' + ( date.getMonth() + 1 ) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return day + '-' + month + '-' + year
}

/**
 * Verifies whether a password is secure or not
 * 
 * @param password 
 * @returns `true` or `false`
 */
export const isPasswordSecure = ( password: string ): boolean => {

    const strongPasswordRegex = new RegExp( '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})' )

    return strongPasswordRegex.test( password )
}

/**
 * Verifies whether the email is valid or not
 * 
 * @param email
 * @returns `true` or `false`
 */
export const isEmailValid = ( email: string ) => {

    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    return validEmailRegex.test( email )
}

/**
 * Verifies whether the string has image format
 * 
 * @param image_name
 * @returns `true` or `false`
 */
export const isImageValid = ( image_name: string ) => {

    const validImageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g

    return validImageRegex.test( image_name )
}

/**
 * Verifies if a CPF (Cadastro Pessoa Física - Brazil) has all the necessary properties
 *
 * @param cpf
 * @returns `true` or `false`
 */
export const isCPFValid = ( _cpf: string ) => {

    if ( !_cpf ) return false

    return cpf.isValid( _cpf )

}

/**
 * Verifies if a CNPJ (Cadastro Nacional de Pessoa Jurídica - Brazil) has all the necessary properties
 *
 * @param _cnpj
 * @returns `true` or `false`
 */
export const isCNPJValid = ( _cnpj: string ) => {

    if ( !_cnpj ) return false

    return cnpj.isValid( _cnpj )

}

/**
 * 
 * @param offset 
 * @returns 
 */
export const nowForPostgre = ( offset: number = 0 ) => {
    return new Date( Date.now() - offset ).toLocaleString()
}

export const nowIsoDate = () => {
    return new Date( Date.now() ).toISOString()
}

export const nowInSeconds = () => {
    return Math.floor( Date.now() / 1000 )
}

export const getRandomFromList = ( array: any[] ) => {
    if ( array && array.length === 0 ) return null
    const random = Math.floor( Math.random() * 10000000000000000 + 1 )
    const index = random % array.length
    return array[index]
}

export const logAxiosError = ( error: AxiosError ) => {
    console.log( `
    ------ AXIOS ERROR -------

        -- URL --
    ${ prettyFormat( error.config?.url ) } 

    -- REQUEST DATA --
     ${ prettyFormat( error.config?.data ) }

     -- REQUEST HEADERS --
    ${ prettyFormat( error.config?.headers ) }

    -- RESPONSE DATA --
    ${ prettyFormat( error.response?.data ? error.response?.data : error.response ) }
    ------ END LOG -------
    `)
}

export const logResponse = ( response: AxiosResponse ) => {
    console.log( `
    ------ AXIOS RESPONSE -------

        -- URL --
    ${ prettyFormat( response.config.url ) } 

    -- REQUEST DATA --
     ${ prettyFormat( response.request ) }

     -- REQUEST HEADERS --
    ${ prettyFormat( response.config.headers ) }

    -- RESPONSE DATA --
    ${ prettyFormat( response.data ) }
    ------ END LOG -------
    `)
}

// Not Safe
export const prettyFormat = ( object: any ) => {
    return JSON.stringify( object, undefined, 2 )
}

export const create_UUID = () => {
    var dt = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c ) {
        var r = ( dt + Math.random() * 16 ) % 16 | 0
        dt = Math.floor( dt / 16 )
        return ( c == 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 )
    } )
    return uuid
}

export const fillString = ( string: string, value: string, size: number ): string => {

    for ( let i = string.length; i < size; i++ ) {
        string = string + value
    }

    return string
}

export const isDateValid = ( date: string ): boolean => {
    const parsedDate = parseDate( date )

    if ( !parsedDate ) return false

    const exists = isExists( parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDay() )

    if ( !exists ) return false

    return isDate( parsedDate )
}

export const parseDate = ( date: string ) => {
    try {
        return parse( date, 'dd-MM-yyyy', new Date() )
    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }
}

export const isNotNumber = ( value: any ) => {
    return isNaN( parseFloat( value ) )
}

export const isNegativeNumber = ( value: number ) => {
    return value < 0
}
