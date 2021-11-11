//
//      hub2b tenant Repository
//

import { MongoError } from "mongodb"
import { HUB2B_Tenants } from "../models/hub2b"
import { hub2bTenantCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save hub2b tenants
 * 
 * @param tenants
 */
export const saveTenant = async ( tenants: HUB2B_Tenants ): Promise<boolean> => {

    try {

        const replacement = { ...tenants }

        const options = {
            upsert: true,
            returnNewDocument: true
        }

        const result = await hub2bTenantCollection.findOneAndReplace( replacement, options )

        return result.ok ? true : false

    } catch ( error ) {
        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B tenant Repository - ${ getFunctionName() }`, 'ERROR' )
        return false
    }
}

/**
 * Retrieve tenants
 * 
 * @param token
 */
export const retrieveTenants = async (): Promise<HUB2B_Tenants[] | null> => {

    try {

        const result = await hub2bTenantCollection.find()

        return result.toArray()

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B tenant Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Deleta tenant
 * 
 * @param access_token
 */
export const deleteTenant = async ( access_token: string ): Promise<boolean> => {

    try {

        const result = await hub2bTenantCollection.deleteOne( { access_token } )

        return result.result.ok === 1

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B tenant Repository - ${ getFunctionName() }`, 'ERROR' )

        return false
    }
}
