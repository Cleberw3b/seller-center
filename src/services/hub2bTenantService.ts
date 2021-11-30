//
//      Tenant Service
//

import { HUB2B_Tenants } from "../models/hub2b"
import { saveTenant, updateTenant, findHub2bTenantByIdTenant } from "../repositories/hub2TenantRepository"
import { saveUser } from "../repositories/hub2UserRepository"
import { saveTenantCredential } from "../repositories/hub2TenantCredentialRepository"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
<<<<<<< HEAD
import { HUB2B_URL_V2, HUB2B_TENANT } from "../utils/consts"
=======
import { HUB2B_URL_V2 } from "../utils/consts"
>>>>>>> f21963ba373fb37c909a5959024ae5a3a9e62e3b
import { HUB2B_CREDENTIALS, renewAccessTokenHub2b } from "./hub2bAuhService"
import { requestHub2B } from "./hub2bService"

/**
 * Save a new Tenant
 * 
 * @param body
 */
export const createTenant = async ( body: any ): Promise<HUB2B_Tenants | null> => {

    if ( !body.idAgency ) {
        const agency = await getTenantInHub2b(HUB2B_TENANT)

        if ( !agency ) {
            log( `Agency ${ body.idAgency } not found in the hub2b`, 'EVENT', getFunctionName(), 'ERROR' )
            return null
        }

        body.idAgency = agency.idAgency
    }

    const newTenant = await setupTenantsHub2b( body )

    if ( !newTenant ) {
        log( `Could not create new Tenant ${ body.name } in the hub2b`, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }

    body.idTenant = newTenant.idTenant

    const savedTenant = await saveTenant( body )

    // Save a new User
    await saveUser( newTenant.users[0] )

    // Save Tenant Credentials
    const tenantCredential = await getTenantCredentialsInHub2b( newTenant.idTenant )
    tenantCredential.idTenant = newTenant.idTenant
    await saveTenantCredential( tenantCredential )

    if ( !savedTenant ) {
        log( `Could not create new Tenant ${ newTenant.name }`, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }

    log( `Tenant ${ newTenant.name } has been created.`, 'EVENT', getFunctionName() )

    return newTenant
}

/**
 * Get Tenant
 * 
 * @returns 
 */
 export const getTenantInHub2b = async (idTenant: any): Promise<HUB2B_Tenants | null> => {
    await renewAccessTokenHub2b()

    const SETUP_URL = HUB2B_URL_V2 + 
      "/Setup/Tenants/" + idTenant + "?access_token=" + HUB2B_CREDENTIALS.access_token
    
    const response = await requestHub2B( SETUP_URL, 'GET' )
    if ( !response ) return null

    const tenant = response.data

    tenant
        ? log( "GET Tenant in hub2b success", "EVENT", getFunctionName() )
        : log( "GET Tenant in hub2b error", "EVENT", getFunctionName(), "WARN" )

    return tenant
}

/**
 * Create a new Tenant in the hub2b
 * 
 * @param body 
 * @returns 
 */
export const setupTenantsHub2b = async (body: any) => {
    await renewAccessTokenHub2b()

    const SETUP_URL = HUB2B_URL_V2 + 
      "/Setup/Tenants?SendPasswordEmail=true&access_token=" + HUB2B_CREDENTIALS.access_token
    
    const response = await requestHub2B( SETUP_URL, 'POST', body )
    if ( !response ) return null

    const create_tenant = response.data

    create_tenant
        ? log( "create new Tenant success", "EVENT", getFunctionName() )
        : log( "create new Tenant error", "EVENT", getFunctionName(), "WARN" )

    return create_tenant
}

/**
 * Get Tenant Credentials
 * 
 * @param body 
 * @returns 
 */
 export const getTenantCredentialsInHub2b = async (idTenant: any) => {
    await renewAccessTokenHub2b()

    const SETUP_URL = HUB2B_URL_V2 + 
      "/Setup/Tenants/" + idTenant + "/Credentials?access_token=" + HUB2B_CREDENTIALS.access_token
    
    const response = await requestHub2B( SETUP_URL, 'POST' )
    if ( !response ) return null

    const tenantCredentials = response.data

    tenantCredentials
        ? log( "POST Tenant Credentials success", "EVENT", getFunctionName() )
        : log( "POST Tenant Credentials error", "EVENT", getFunctionName(), "WARN" )

    return tenantCredentials
}

/**
 * Update Tenant
 * 
 * @param body
 */
 export const updateHub2bTenant = async ( body: any ): Promise<HUB2B_Tenants | null> => {

    if ( !body.idAgency ) {
        const agency = await getTenantInHub2b(HUB2B_TENANT)

        if ( !agency ) {
            log( `Agency ${ body.idAgency } not found in the hub2b`, 'EVENT', getFunctionName(), 'ERROR' )
            return null
        }

        body.idAgency = agency.idAgency
    }

    const tenant = await updateTenantsInHub2b( body )

    if ( !tenant ) {
        log( `Could not update Tenant ${ tenant.name } in the hub2b`, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }

    const updatedTenant = await updateTenant( body )

    if ( !updatedTenant ) {
        log( `Could not update Tenant ${ tenant.name }`, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }

    log( `Tenant ${ tenant.name } has been updated.`, 'EVENT', getFunctionName() )

    return tenant
}

/**
 * Update Tenant in the hub2b
 * 
 * @param body 
 * @returns 
 */
 export const updateTenantsInHub2b = async (body: any) => {
    await renewAccessTokenHub2b()

    const SETUP_URL = HUB2B_URL_V2 + 
      "/Setup/Tenants/" + body.idTenant + "?access_token=" + HUB2B_CREDENTIALS.access_token
    
    const response = await requestHub2B( SETUP_URL, 'PUT', body )
    if ( !response ) return null

    const tenant = response.data

    tenant
        ? log( "update Tenant success", "EVENT", getFunctionName() )
        : log( "update Tenant error", "EVENT", getFunctionName(), "WARN" )

    return tenant
}

/**
 * Get Tenant
 * 
 * @param idTenant
 */
 export const getHub2bTenant = async ( idTenant: any ): Promise<HUB2B_Tenants | null> => {

    const tenant = await findHub2bTenantByIdTenant( idTenant )

    if ( !tenant ) {
        log( `Tenant not found`, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }

    return tenant
}