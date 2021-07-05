//
//      HUB2B Service
//

import axios, { Method } from "axios"
import { HUB2B_Invoice, HUB2B_Product, HUB2B_Status, HUB2B_Tracking } from "../models/hub2b"
import { Product } from "../models/product"
import { PROJECT_HOST } from "../utils/consts"
import { log } from "../utils/loggerUtil"
import { getFunctionName, nowIsoDate } from "../utils/util"

// Default
const default_headers = {
    'Content-Type': 'application/json'
}

// API v1 -- Integração de produtos e categorias
const URL_V1 = "https://eb-api.plataformahub.com.br/RestServiceImpl.svc"
const idTenant = 2032
const TokenDeAcesso = "EZpH53QWxMPAI09O9fUu"
const headersV1 = {
    ...default_headers,
    "auth": TokenDeAcesso
}

// API v2 -- Integração de preço/estoque e pedidos
const URL_V2 = " https://rest.hub2b.com.br"
const client_id = "UwSjZbV99eZN9sVXkvaIsow20AIciQ"
const client_secret = "hKDpu93dvUTJMqO83IHk9nV9vSLtFJ"
const grant_type = "password"
const scope = "inventory orders catalog agency"
const username = "testes@2032g"
const password = "PXwInKodUAXhM8kcurQw"
let credentials = {
    access_token: '',
    expires_in: 7200,
    refresh_token: '',
    token_type: 'bearer'
}

export const requestHub2B = async ( URL: string, type?: Method, body?: any, headers?: any ) => {

    if ( !type ) type = 'GET'

    if ( !headers ) headers = { headers: default_headers }

    try {

        const response = await axios( {
            method: type,
            url: URL,
            data: body,
            headers
        } )

        response
            ? log( "Request success", "EVENT", getFunctionName() )
            : log( "Request failed", "EVENT", getFunctionName(), "WARN" )

        return response

    } catch ( error ) {

        if ( axios.isAxiosError( error ) )
            log( error.response?.data?.errors, "EVENT", getFunctionName(), "ERROR" )

        if ( error instanceof Error ) {
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        }

        return null
    }
}

export const generateAccessTokenV2 = async () => {

    const URL_OAUTH = URL_V2 + "/oauth2/login"

    const body = { client_id, client_secret, grant_type, scope, username, password }

    const response = await requestHub2B( URL_OAUTH, 'POST', body )

    if ( !response ) return null

    credentials = response.data

    credentials.access_token
        ? log( "Token atualizado com sucesso", "EVENT", getFunctionName() )
        : log( "Não foi passível obter o token de acesso", "EVENT", getFunctionName(), "WARN" )

    return credentials.access_token
}

export const setupIntegration = async () => {

    const SETUP_URL = URL_V2 + "/Setup/integration"

    const body = {
        system: "ERPOrdersNotification",
        idTenant,
        responsibilities: [
            {
                type: "Orders",
                flow: "HubTo"
            }
        ],
        apiKeys: [
            {
                key: "URL_ERPOrdersNotification",
                value: PROJECT_HOST + "/order"
            },
            {
                key: "authToken_ERPOrdersNotification",
                value: "Bearer dslfkskdjhfjkhsakdhkjsdavsdn64567sdvjdf"
            },
            {
                key: "AuthKey_ERPOrdersNotification",
                value: "ApiKey"
            },
            {
                key: "HUB_ID_ERPOrdersNotification",
                value: "2032"
            }
        ]
    }

    const response = await requestHub2B( SETUP_URL, 'POST', body )

    if ( !response ) return null

    const setup = response.data

    setup
        ? log( "Setup realizado com sucesso", "EVENT", getFunctionName() )
        : log( "Não foi passível obter o token de acesso", "EVENT", getFunctionName(), "WARN" )

}

export const criarProdutoHub2b = async ( produto: Product ) => {

    const URL = URL_V1 + "/setsku/" + idTenant

    let hub2productList: HUB2B_Product[] = []

    const imageList = produto.images.map( url => {
        return { url }
    } )

    produto.variations?.forEach( variation => {

        const productHub2: HUB2B_Product = {
            sku: variation._id.toString(),
            parentSKU: produto._id.toString(),
            ean13: produto.ean,
            warrantyMonths: 30,
            handlingTime: 2,
            stock: `${ variation.stock }`,
            weightKg: `${ produto.weight / 1000 }`,
            url: `${ PROJECT_HOST }/product/${ variation._id.toString() }`,
            sourceId: variation._id.toString(),
            categoryCode: `${ produto.category }`,
            name: produto.name,
            sourceDescription: produto.description,
            description: produto.description,
            brand: produto.brand,
            videoURL: "",
            ncm: "",
            idProductType: 1,
            idTypeCondition: 1,
            shippingType: "me1;me2",
            height_m: `${ produto.height / 100 }`,
            width_m: `${ produto.width / 100 }`,
            length_m: `${ produto.length / 100 }`,
            priceBase: `${ produto.price }`,
            priceSale: `${ produto.price - ( produto.price_discounted ? produto.price_discounted : 0 ) }`,
            images: imageList,
            specifications: [{
                name: "Garantia",
                value: "30 dias",
                type: 2
            }]
        }

        hub2productList.push( productHub2 )
    } )

    const response = await requestHub2B( URL, 'POST', hub2productList, headersV1 )

    if ( response?.data.error ) {

        log( "Não foi possível cadastrar produto no HUB2B", "EVENT", getFunctionName(), "WARN" )

        return null
    }

    log( "Produto cadastrado com sucesso no HUB2B", "EVENT", getFunctionName() )
}

export const getStock = async ( variation_id: any ) => {

    await generateAccessTokenV2()

    const URL_STOCK = URL_V2 + `/inventory/${ variation_id }/stocks` + "?access_token=" + credentials.access_token

    const response = await requestHub2B( URL_STOCK )

    if ( !response ) return null

    const stock = response.data[0]

    stock
        ? log( "Get List Orders success", "EVENT", getFunctionName() )
        : log( "Get List Orders error", "EVENT", getFunctionName(), "WARN" )

    return stock
}

export const updateStock = async ( variation_id: any, stock: number ) => {

    await generateAccessTokenV2()

    const URL_STOCK = URL_V2 + `/inventory/${ variation_id }/stocks` + "?access_token=" + credentials.access_token

    const body = {
        available: stock,
        warehouseId: 0
    }
    const response = await requestHub2B( URL_STOCK, 'PUT', body )

    if ( !response ) return null

    const update_stock = response.data

    update_stock
        ? log( "Get List Orders success", "EVENT", getFunctionName() )
        : log( "Get List Orders error", "EVENT", getFunctionName(), "WARN" )

    return update_stock
}

export const updatePrice = async ( variation_id: any, price: number, price_discounted: number ) => {

    await generateAccessTokenV2()

    const URL_PRICE = URL_V2 + `/inventory/${ variation_id }/price` + "?access_token=" + credentials.access_token

    const body = {
        base: price,
        sale: price_discounted
    }

    const response = await requestHub2B( URL_PRICE, 'PUT', body )

    if ( !response ) return null

    const orders = response.data

    orders
        ? log( "Get List Orders success", "EVENT", getFunctionName() )
        : log( "Get List Orders error", "EVENT", getFunctionName(), "WARN" )

    return orders
}

// TODO -> Implementar
export const postOrder = async () => {

    await generateAccessTokenV2()

    const URL_ORDERS = URL_V2 + "/Orders" + "?access_token=" + credentials.access_token

    const body = {}

    const response = await requestHub2B( URL_ORDERS, 'POST', body )

    if ( !response ) return null

    const orders = response.data.response

    orders
        ? log( "POST Orders success", "EVENT", getFunctionName() )
        : log( "POST Orders error", "EVENT", getFunctionName(), "WARN" )

    return orders

}

export const listOrders = async () => {

    await generateAccessTokenV2()

    const URL_ORDERS = URL_V2 + "/Orders" + "?access_token=" + credentials.access_token

    const response = await requestHub2B( URL_ORDERS )

    if ( !response ) return null

    const orders = response.data.response

    orders
        ? log( "Get List Orders success", "EVENT", getFunctionName() )
        : log( "Get List Orders error", "EVENT", getFunctionName(), "WARN" )

    return orders
}

export const postInvoice = async ( order_id: number, _invoice: HUB2B_Invoice ) => {

    await generateAccessTokenV2()

    const URL_INVOICE = URL_V2 + `/Orders/${ order_id }/Invoice` + "?access_token=" + credentials.access_token

    const body = _invoice

    const response = await requestHub2B( URL_INVOICE, "POST", body )

    if ( !response ) return null

    const invoice = response.data

    invoice
        ? log( "POST Invoice success", "EVENT", getFunctionName() )
        : log( "POST Invoice error", "EVENT", getFunctionName(), "WARN" )

    return invoice
}

export const getInvoice = async ( order_id: number ) => {

    await generateAccessTokenV2()

    const URL_INVOICE = URL_V2 + `/Orders/${ order_id }/Invoice` + "?access_token=" + credentials.access_token

    const response = await requestHub2B( URL_INVOICE )

    if ( !response ) return null

    const invoice = response.data

    invoice
        ? log( "Get Invoice success", "EVENT", getFunctionName() )
        : log( "Get Invoice error", "EVENT", getFunctionName(), "WARN" )

    return invoice
}

// Não é permitido enviar os dados de rastreio sem antes ter enviado a nota fiscal.
export const postTracking = async ( order_id: number, _tracking: HUB2B_Tracking ) => {

    await generateAccessTokenV2()

    const URL_TRACKING = URL_V2 + `/Orders/${ order_id }/Tracking` + "?access_token=" + credentials.access_token

    const body = _tracking

    const response = await requestHub2B( URL_TRACKING, "POST", body )

    if ( !response ) return null

    const tracking = response.data

    tracking
        ? log( "POST Tracking success", "EVENT", getFunctionName() )
        : log( "POST Tracking error", "EVENT", getFunctionName(), "WARN" )

    return tracking
}

export const getTracking = async ( order_id: number ) => {

    await generateAccessTokenV2()

    const URL_TRACKING = URL_V2 + `/Orders/${ order_id }/Tracking` + "?access_token=" + credentials.access_token

    const response = await requestHub2B( URL_TRACKING )

    if ( !response ) return null

    const tracking = response.data

    tracking
        ? log( "Get Tracking success", "EVENT", getFunctionName() )
        : log( "Get Tracking error", "EVENT", getFunctionName(), "WARN" )

    return tracking
}


export const updateStatus = async ( order_id: number, _status: HUB2B_Status ) => {

    await generateAccessTokenV2()

    const URL_STATUS = URL_V2 + `/Orders/${ order_id }/Status` + "?access_token=" + credentials.access_token

    const body = _status

    const response = await requestHub2B( URL_STATUS, 'PUT', body )

    if ( !response ) return null

    const status = response.data

    status
        ? log( "Get Tracking success", "EVENT", getFunctionName() )
        : log( "Get Tracking error", "EVENT", getFunctionName(), "WARN" )

    return status
}
