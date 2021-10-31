//
//      hub2b credential Repository
//

import { MongoError } from "mongodb"
import { HUB2B_Credentials } from "../models/hub2b"
import { hub2bAuthCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save hub2b credentials
 * 
 * @param credentials
 */
export const saveCredential = async ( credentials: HUB2B_Credentials ): Promise<boolean> => {

    try {

        const query = { access_token: credentials.access_token }

        const replacement = { ...credentials }

        const options = {
            upsert: true,
            returnNewDocument: true
        }

        const result = await hub2bAuthCollection.findOneAndReplace( query, replacement, options )

        return result.ok ? true : false

    } catch ( error ) {
        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B credential Repository - ${ getFunctionName() }`, 'ERROR' )
        return false
    }
}

/**
 * Retrieve credentials
 * 
 * @param token
 */
export const retrieveCredentials = async (): Promise<HUB2B_Credentials[] | null> => {

    try {

        const result = await hub2bAuthCollection.find()

        return result.toArray()

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B credential Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Deleta credential
 * 
 * @param access_token
 */
export const deleteCredential = async ( access_token: string ): Promise<boolean> => {

    try {

        const result = await hub2bAuthCollection.deleteOne( { access_token } )

        return result.result.ok === 1

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B credential Repository - ${ getFunctionName() }`, 'ERROR' )

        return false
    }
}
