//
//      hub2b tenantCredential Repository
//

import { MongoError } from "mongodb"
import { HUB2B_TenantCredentials } from "../models/hub2b"
import { hub2bTenantCredentialCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save hub2b tenantCredentials
 * 
 * @param tenantCredentials
 */
export const saveTenantCredential = async ( tenantCredentials: HUB2B_TenantCredentials ): Promise<boolean> => {

    try {

        const replacement = { ...tenantCredentials }

        const options = {
            upsert: true,
            returnNewDocument: true
        }

        const result = await hub2bTenantCredentialCollection.findOneAndReplace( replacement, options )

        return result.ok ? true : false

    } catch ( error ) {
        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B tenantCredential Repository - ${ getFunctionName() }`, 'ERROR' )
        return false
    }
}

/**
 * Retrieve tenantCredentials
 * 
 */
export const retrieveTenantCredentials = async (): Promise<HUB2B_TenantCredentials[] | null> => {

    try {

        const result = await hub2bTenantCredentialCollection.find()

        return result.toArray()

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B tenantCredential Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Deleta tenantCredential
 * 
 * @param access_token
 */
export const deleteTenantCredential = async ( access_token: string ): Promise<boolean> => {

    try {

        const result = await hub2bTenantCredentialCollection.deleteOne( { access_token } )

        return result.result.ok === 1

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B tenantCredential Repository - ${ getFunctionName() }`, 'ERROR' )

        return false
    }
}
