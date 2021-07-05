//
//      Activation Token Repository
//

import { MongoError } from "mongodb"
import { AccessToken } from "../models/token"
import { accessTokenCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save activation token
 * 
 * @param activationToken - the token to be saved
 */
export const createAccessToken = async ( activationToken: AccessToken ): Promise<AccessToken | null> => {

    try {

        const result = await accessTokenCollection.insertOne( activationToken )

        return result.ops[0] ? result.ops[0] : null

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Find activation token by token string
 * 
 * @param token
 */
export const findAccessTokenByToken = async ( token: string ): Promise<AccessToken | null> => {

    try {

        return await accessTokenCollection.findOne( { token } )

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Retrieve all access tokens
 * 
 * @param token
 */
export const retrieveAllAccessToken = async (): Promise<AccessToken[] | null> => {

    try {

        const result = await accessTokenCollection.find()

        return result.toArray()

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Find activation token by token string
 * 
 * @param token
 */
export const deleteAccessToken = async ( token: string ): Promise<boolean> => {

    try {

        const result = await accessTokenCollection.deleteOne( { token } )

        return result.result.ok === 1

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )

        return false
    }
}
