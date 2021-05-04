//
//      Token Service
//

import { User } from "../models/user"
import { ActivationToken } from "../models/token"
import { createNewActivationToken, findActivationTokenByToken } from "../repositories/tokenRepository"
import { log } from "../utils/loggerUtil"
import { create_UUID, getFunctionName, nowInSeconds } from "../utils/util"

/**
 * Crea
 * 
 * @param user  `User`
 */
export const generateNewActivationToken = async ( user: User ): Promise<ActivationToken | null> => {

    const expiration = nowInSeconds() + 86400

    const token = create_UUID()

    if ( !user._id ) {
        log( `User id is missing.`, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }

    const activationToken: ActivationToken = {
        token,
        user_id: user._id,
        expires_at: expiration
    }

    const generatedToken = await createNewActivationToken( activationToken )

    generatedToken
        ? log( `New activation token generated for ${ user.email } `, 'EVENT', getFunctionName() )
        : log( `Could not generate new token.`, 'EVENT', getFunctionName(), 'ERROR' )

    return generatedToken
}

export const isTokenValid = async ( token: string ): Promise<ActivationToken | null> => {

    if ( !token ) return null

    const activateToken = await findActivationTokenByToken( token )

    if ( !activateToken ) return null

    if ( nowInSeconds() > activateToken.expires_at ) return null

    return activateToken

}