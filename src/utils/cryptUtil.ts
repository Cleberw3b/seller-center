import jwt, { SignOptions } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { SECRET } from './consts'
import { nowInSeconds } from './util'
import { log } from './loggerUtil'

const jwtConfig: SignOptions = {
    expiresIn: 3600 // 1 hour
}

const SALT_ROUNDS = 10

export const hashPassword = async ( password: string ): Promise<string> => {
    try {
        return await bcrypt.hashSync( password, SALT_ROUNDS )
    } catch ( error ) {
        console.error( error )
        return ''
    }
}

export const comparePassword = async ( password: string, encryptedPassword: string ): Promise<boolean> => {
    return await bcrypt.compareSync( password, encryptedPassword )
}

export const getToken = ( data: any ): string => {
    return jwt.sign( { data }, SECRET, jwtConfig )
}

export const isJWTTokenValid = ( token: string | undefined ): boolean => {

    if ( !token ) return false

    let decoded: any

    try {
        decoded = jwt.verify( token, SECRET, {} )
    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, 'EVENT', 'JWT Verification', 'ERROR' )
        return false
    }

    if ( !decoded || !decoded.exp ) return false

    const now = nowInSeconds()

    return decoded.exp >= now
}

export const decodeJWT = ( token: string ) => {
    return jwt.decode( token )
}
