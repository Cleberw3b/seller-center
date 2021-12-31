//
//      hub2b tenant Repository
//

import { ObjectID, MongoError } from "mongodb"
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
        const result = await hub2bTenantCollection.insertOne( tenants )

        return result.ops[0] ? true : false

    } catch ( error ) {
        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B tenant Repository - ${ getFunctionName() }`, 'ERROR' )
        return false
    }
}

/**
 * Update hub2b tenants
 *
 * @param tenants
 */
 export const updateTenant = async ( tenants: HUB2B_Tenants ): Promise<HUB2B_Tenants | null> => {

    try {
        const result = await hub2bTenantCollection.updateOne(
            { idTenant: tenants.idTenant },
            { $set: tenants },
            { upsert: true } )

        let id: ObjectID | null = null

        if ( result.upsertedCount )
            id = result.upsertedId._id

        if ( result.matchedCount )
            return await findHub2bTenantByIdTenant( tenants.idTenant )

        if ( !id ) throw new MongoError( "Não gerou id" )

        tenants._id = id

        return tenants

    } catch ( error ) {
        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B tenant Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find hub2b Tenant by idTenant
 *
 * @param idTenant
 */
 export const findHub2bTenantByIdTenant = async ( idTenant: number ): Promise<HUB2B_Tenants | null> => {

    try {

        const hub2bTenant = await hub2bTenantCollection.findOne( { idTenant } )

        return hub2bTenant

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `HUB2B tenant Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
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
