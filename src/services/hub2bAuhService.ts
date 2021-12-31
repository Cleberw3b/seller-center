//
//      HUB2B Auth Service
//

import { log } from "../utils/loggerUtil"
import { getFunctionName, nowInSeconds } from "../utils/util"
import { deleteCredential, retrieveCredentials, saveCredential, findAuthByTenant } from "../repositories/hub2AuthRepository"
import { HUB2B_Credentials } from "../models/hub2b"
import { HUB2B_CLIENT_ID, HUB2B_CLIENT_SECRET, HUB2B_PASSWORD, HUB2B_TENANT, HUB2B_URL_V2, HUB2B_USERNAME } from "../utils/consts"
import { requestHub2B } from "./hub2bService"
import { findTenantCredential  } from "../repositories/hub2TenantCredentialRepository"

export let HUB2B_CREDENTIALS: HUB2B_Credentials = {
    tenant_id: HUB2B_TENANT,
    access_token: '',
    expires_in: 7200,
    refresh_token: '',
    token_type: 'bearer',
    update_at: 0
}

export const isAccessTokenValidHub2b = ( credentials: HUB2B_Credentials ) => {

    const now = Math.floor( nowInSeconds() )

    if ( !credentials.access_token ) return false

    if ( !credentials.update_at ) return false

    if ( credentials.update_at + credentials.expires_in < now ) return false

    return true
}

export const generateAccessTokenV2Hub2b = async (idTenant = null) => {
    let hub2bUsername = HUB2B_USERNAME
    let hub2bPassword = HUB2B_PASSWORD

    let scope = "inventory orders catalog agency"

    if (idTenant) {

        scope = "inventory orders catalog"

        const credentials = await findTenantCredential(idTenant)

        if (!credentials) return null

        hub2bUsername = credentials.apiV2.userName
        hub2bPassword = credentials.apiV2.password
    }

    const URL_OAUTH = HUB2B_URL_V2 + "/oauth2/login"

    const body = {
        client_id: HUB2B_CLIENT_ID,
        client_secret: HUB2B_CLIENT_SECRET,
        username: hub2bUsername,
        password: hub2bPassword,
        grant_type: "password",
        scope: scope
    }

    const response = await requestHub2B( URL_OAUTH, 'POST', body )

    if ( !response ) return null

    HUB2B_CREDENTIALS = response.data
    HUB2B_CREDENTIALS.tenant_id = idTenant || HUB2B_TENANT

    HUB2B_CREDENTIALS.access_token
        ? log( "Access Token obtido com sucesso", "EVENT", getFunctionName() )
        : log( "Não foi passível obter o token de acesso", "EVENT", getFunctionName(), "WARN" )

    HUB2B_CREDENTIALS.update_at = Math.floor( nowInSeconds() )

    await createCredential()

    return HUB2B_CREDENTIALS.access_token
}

/**
 * Create credential
 *
 * @param user  `User`
 */
export const createCredential = async (): Promise<void> => {

    const credential = await saveCredential( HUB2B_CREDENTIALS )

    credential
        ? log( `New HUB2B credential stored`, 'EVENT', getFunctionName() )
        : log( `Could not generate HUB2B credential.`, 'EVENT', getFunctionName(), 'ERROR' )
}

export const findValidCredential = async (): Promise<HUB2B_Credentials> => {

    const credentials = await retrieveCredentials()

    if ( !credentials || credentials.length === 0 ) return HUB2B_CREDENTIALS

    const credential = credentials.find( credential => isAccessTokenValidHub2b( credential ) )

    if ( !credential ) return HUB2B_CREDENTIALS

    return credential
}

export const removeInvalidCredentials = async ( access_token: string ): Promise<boolean> => {

    const deletedCredential = await deleteCredential( access_token )

    deletedCredential
        ? log( `Credential ${ access_token } deleted.`, 'EVENT', getFunctionName() )
        : log( `Could not delete access token.`, 'EVENT', getFunctionName(), 'ERROR' )

    return deletedCredential
}

export const deleteAllInvalid = async () => {

    const credentials = await retrieveCredentials()

    if ( !credentials ) return

    credentials.forEach( credential => {
        if ( !isAccessTokenValidHub2b( credential ) ) removeInvalidCredentials( credential.access_token )
    } )
}

export const renewAccessTokenHub2b = async ( force = false, idTenant = null ) => {

    if (idTenant) {

        const auth = await findAuthByTenant(idTenant)

        if (!auth) return await generateAccessTokenV2Hub2b(idTenant)

        HUB2B_CREDENTIALS = auth
    }

    HUB2B_CREDENTIALS.tenant_id = idTenant || HUB2B_TENANT

    if ( !force && isAccessTokenValidHub2b( HUB2B_CREDENTIALS ) ) return

    if (!HUB2B_CREDENTIALS.refresh_token) return await generateAccessTokenV2Hub2b()

    const URL_REFRESH = HUB2B_URL_V2 + "/oauth2/token"

    const body = {
        client_id: HUB2B_CLIENT_ID,
        client_secret: HUB2B_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: HUB2B_CREDENTIALS.refresh_token
    }

    const response = await requestHub2B( URL_REFRESH, 'POST', body )

    if (!response) return await generateAccessTokenV2Hub2b()

    HUB2B_CREDENTIALS = response.data
    HUB2B_CREDENTIALS.tenant_id = idTenant || HUB2B_TENANT

    HUB2B_CREDENTIALS.access_token
        ? log( "Token atualizado com sucesso", "EVENT", getFunctionName() )
        : log( "Não foi passível atualizar o token de acesso", "EVENT", getFunctionName(), "WARN" )

    HUB2B_CREDENTIALS.update_at = nowInSeconds() / 60

    await createCredential()

    return HUB2B_CREDENTIALS.access_token
}

export const recoverLateCredential = async () => {

    const credential = await findValidCredential()

    if ( isAccessTokenValidHub2b( credential ) )
        HUB2B_CREDENTIALS = credential

    await renewAccessTokenHub2b( true )
}

setInterval( async () => await renewAccessTokenHub2b( true ), 3600 * 60 * 1000 )

setInterval( deleteAllInvalid, 2 * 60 * 1000 )
