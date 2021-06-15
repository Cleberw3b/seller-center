//
//      Activation Token Repository
//

import { MongoError } from "mongodb"
import { ActivationToken } from "../models/token"
import { activationTokenCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save activation token
 * 
 * @param activationToken - the token to be saved
 */
export const createNewActivationToken = async ( activationToken: ActivationToken ): Promise<ActivationToken | null> => {
    try {

        const result = await activationTokenCollection.insertOne( activationToken )

        return result.ops[0] ? result.ops[0] : null

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find activation token by token string
 * 
 * @param token
 */
export const findActivationTokenByToken = async ( token: string ): Promise<ActivationToken | null> => {
    try {

        return await activationTokenCollection.findOne( { token } )

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find activation token by token string
 * 
 * @param token
 */
export const deleteToken = async ( token: string ): Promise<boolean> => {
    try {

        const result = await activationTokenCollection.deleteOne( { token } )

        return result.result.ok === 1

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )
        return false
    }
}
