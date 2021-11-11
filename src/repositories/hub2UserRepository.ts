//
//      hub2b user Repository
//

import { MongoError } from "mongodb"
import { HUB2B_Users } from "../models/hub2b"
import { hub2bUserCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save hub2b users
 * 
 * @param users
 */
export const saveUser = async ( users: HUB2B_Users ): Promise<boolean> => {

    try {

        const replacement = { ...users }

        const options = {
            upsert: true,
            returnNewDocument: true
        }

        const result = await hub2bUserCollection.findOneAndReplace( replacement, options )

        return result.ok ? true : false

    } catch ( error ) {
        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B user Repository - ${ getFunctionName() }`, 'ERROR' )
        return false
    }
}

/**
 * Retrieve users
 * 
 * @param token
 */
export const retrieveUsers = async (): Promise<HUB2B_Users[] | null> => {

    try {

        const result = await hub2bUserCollection.find()

        return result.toArray()

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B user Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Deleta user
 * 
 * @param access_token
 */
export const deleteUser = async ( access_token: string ): Promise<boolean> => {

    try {

        const result = await hub2bUserCollection.deleteOne( { access_token } )

        return result.result.ok === 1

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B user Repository - ${ getFunctionName() }`, 'ERROR' )

        return false
    }
}
