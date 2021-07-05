//
//      HUB2B Service
//

import axios from "axios"
import { HUB2B_Product, productExample } from "../models/hub2b"
import { Product } from "../models/product"
import { PROJECT_HOST } from "../utils/consts"
import { log } from "../utils/loggerUtil"
import { getFunctionName, nowIsoDate } from "../utils/util"

// Default
const headers = {
    'Content-Type': 'application/json'
}

// API v1 -- Integração de produtos e categorias
const URL_V1 = "https://eb-api.plataformahub.com.br/RestServiceImpl.svc"
const idTenant = 2032
const TokenDeAcesso = "EZpH53QWxMPAI09O9fUu"
const headersV1 = {
    ...headers,
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

    try {
        const response = await axios.post( SETUP_URL, body, { headers } )

        const setup = response.data

        setup
            ? log( "Setup realizado com sucesso", "EVENT", getFunctionName() )
            : log( "Não foi passível obter o token de acesso", "EVENT", getFunctionName(), "WARN" )

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        return null
    }
}

export const criarProdutoHub2b = async ( produto: Product ) => {

    const URL = URL_V1 + "/setsku/" + idTenant

    let hub2productList: HUB2B_Product[] = []

    const imageList = produto.images.map( url => {
        return { url }
    } )

    produto.variations?.forEach( variation => {

        const productHub2: HUB2B_Product = {
            sku: variation._id,
            parentSKU: produto._id,
            ean13: produto.ean,
            warrantyMonths: 30,
            handlingTime: 2,
            stock: `${ variation.stock }`,
            weightKg: `${ produto.weight * 1000 }`,
            url: `${ PROJECT_HOST }/product/${ variation._id }`,
            sourceId: variation._id,
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
            height_m: `${ produto.height }`,
            width_m: `${ produto.width }`,
            length_m: `${ produto.length }`,
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

    try {

        const response = await axios.post( URL, hub2productList, { headers: headersV1 } )

        const sku = response

        sku
            ? log( "Produto cadastrado com sucesso no HUB2B", "EVENT", getFunctionName() )
            : log( "Não foi possível cadastrar produto no HUB2B", "EVENT", getFunctionName(), "WARN" )

        return sku

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        return null
    }

}

export const generateAccessTokenV2 = async () => {

    const URL_TOKEN = URL_V2 + "/oauth2/login"

    const body = { client_id, client_secret, grant_type, scope, username, password }

    try {
        const response = await axios.post( URL_TOKEN, body, { headers } )

        credentials = response.data

        credentials.access_token
            ? log( "Token atualizado com sucesso", "EVENT", getFunctionName() )
            : log( "Não foi passível obter o token de acesso", "EVENT", getFunctionName(), "WARN" )

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        return null
    }

}

// TODO -> Implementar
export const postOrder = async () => {

    const URL_ORDERS = URL_V2 + "/Orders" + "?access_token=" + credentials.access_token

    const body = {}

    try {
        const response = await axios.post( URL_ORDERS, body, { headers } )

        const orders = response.data.response

        orders
            ? log( "POST Orders success", "EVENT", getFunctionName() )
            : log( "POST Orders error", "EVENT", getFunctionName(), "WARN" )

        return orders

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        return null
    }

}

export const listOrders = async () => {

    const URL_ORDERS = URL_V2 + "/Orders" + "?access_token=" + credentials.access_token

    try {
        const response = await axios.get( URL_ORDERS, { headers } )

        const orders = response.data.response

        orders
            ? log( "Get List Orders success", "EVENT", getFunctionName() )
            : log( "Get List Orders error", "EVENT", getFunctionName(), "WARN" )

        return orders

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        return null
    }

}

export const postInvoice = async ( order_id: string ) => {

    const URL_ORDERS = URL_V2 + `/Orders/${ order_id }/Invoice` + "?access_token=" + credentials.access_token

    const body = {
        "xml": "string",
        "key": "string",
        "number": "string",
        "cfop": "string",
        "series": "string",
        "totalAmount": 0,
        "issueDate": "2021-05-25T17:43:24.166Z",
        "xmlReference": "string",
        "packages": 0
    }

    try {
        const response = await axios.post( URL_ORDERS, body, { headers } )

        const invoice = response.data

        invoice
            ? log( "POST Invoice success", "EVENT", getFunctionName() )
            : log( "POST Invoice error", "EVENT", getFunctionName(), "WARN" )

        return invoice

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        return null
    }

}

export const getInvoice = async ( order_id: string ) => {

    const URL_ORDERS = URL_V2 + `/Orders/${ order_id }/Invoice` + "?access_token=" + credentials.access_token

    try {
        const response = await axios.get( URL_ORDERS, { headers } )

        const invoice = response.data

        invoice
            ? log( "Get Invoice success", "EVENT", getFunctionName() )
            : log( "Get Invoice error", "EVENT", getFunctionName(), "WARN" )

        return invoice

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        return null
    }

}

// Não é permitido enviar os dados de rastreio sem antes ter enviado a nota fiscal.
export const postTracking = async ( order_id: string, tracking_code: string, tracking_url: string, ) => {

    const URL_ORDERS = URL_V2 + `/Orders/${ order_id }/Tracking` + "?access_token=" + credentials.access_token

    const body = {
        "code": "string",
        "url": "string",
        "shippingDate": nowIsoDate(),
        "shippingProvider": "string",
        "shippingService": "string"
    }

    try {
        const response = await axios.post( URL_ORDERS, body, { headers } )

        const tracking = response.data

        tracking
            ? log( "POST Tracking success", "EVENT", getFunctionName() )
            : log( "POST Tracking error", "EVENT", getFunctionName(), "WARN" )

        return tracking

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        return null
    }

}


export const getTracking = async ( order_id: string ) => {

    const URL_ORDERS = URL_V2 + `/Orders/${ order_id }/Tracking` + "?access_token=" + credentials.access_token

    try {
        const response = await axios.get( URL_ORDERS, { headers } )

        const tracking = response.data

        tracking
            ? log( "Get Tracking success", "EVENT", getFunctionName() )
            : log( "Get Tracking error", "EVENT", getFunctionName(), "WARN" )

        return tracking

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "ERROR" )
        return null
    }

}
