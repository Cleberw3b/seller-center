//
//      HUB2B Service
//

import axios, { Method } from "axios"
import { AnyRecordWithTtl } from "dns"
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
const URL_V2 = "https://rest.hub2b.com.br"
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

        const _variation: any = { ...variation }

        if ( _variation._id ) delete _variation._id

        if ( _variation.stock ) delete _variation.stock

        if ( _variation.product_id ) delete _variation.product_id

        const attributes: { name: string, value: string, type: number }[] = []

        for ( const [key, value] of Object.entries<string>( _variation ) ) {

            attributes.push( { name: key, value: value, type: 2 } )
        }

        const productHub2: HUB2B_Product = {
            sku: variation._id.toString(),
            parentSKU: produto._id.toString(),
            ean13: produto.ean,
            warrantyMonths: 3,
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
            priceSale: `${ produto.price_discounted ? produto.price_discounted : produto.price }`,
            images: imageList,
            specifications: attributes
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

export const updateProduto = async ( patch: any[] ) => {

    const URL = URL_V1 + "/setsku/" + idTenant

    const response = await requestHub2B( URL, 'POST', patch, headersV1 )

    if ( !response ) return null

    if ( response?.data.error ) {

        log( "Não foi possível atualizar produto no HUB2B", "EVENT", getFunctionName(), "WARN" )

        return null
    }

    log( "Produto atualizado com sucesso no HUB2B", "EVENT", getFunctionName() )

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

export const listOrders = async ( ordersNumber?: string[] ) => {

    await generateAccessTokenV2()

    let URL_ORDERS = ''

    if ( ordersNumber ) {

        let orderParam = ''

        for ( const orderNumber of ordersNumber ) {
            orderParam += orderNumber + ","
        }

        orderParam = orderParam.substr( 0, orderParam.length - 1 )

        URL_ORDERS = URL_V2 + "/Orders" + "?number=" + orderParam + "&access_token=" + credentials.access_token

    } else
        URL_ORDERS = URL_V2 + "/Orders" + "?access_token=" + credentials.access_token

    const response = await requestHub2B( URL_ORDERS )

    if ( !response ) return null

    const orders = response.data.response

    orders
        ? log( "Get List Orders success", "EVENT", getFunctionName() )
        : log( "Get List Orders error", "EVENT", getFunctionName(), "WARN" )

    return orders
}

export const postInvoice = async ( order_id: string, _invoice: HUB2B_Invoice ) => {

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

export const getInvoice = async ( order_id: string ) => {

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
export const postTracking = async ( order_id: string, _tracking: HUB2B_Tracking ) => {

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

export const getTracking = async ( order_id: string ) => {

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


export const updateStatus = async ( order_id: string, _status: HUB2B_Status ) => {

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


// #############################################################
// ##############           HOMOLOGAÇÃO         ################
// #############################################################

const sku = '60f761e79a36eb4e309d67bc'

const pedido1 = 'TESTE-637624551852328025'
const pedido2 = 'TESTE-637624551893312614'
const pedido3 = 'TESTE-637624551908384251'
const pedido4 = 'TESTE-637624551921954283'
const pedido5 = 'TESTE-637624551935945533'

const listaPedidos = [pedido1, pedido2, pedido3, pedido4, pedido5]

const orderId1 = 797209119
const orderId2 = 797209118
const orderId3 = 797209117
const orderId4 = 797209116
const orderId5 = 797209115

const ordersIds = [orderId1, orderId2, orderId3, orderId4, orderId5]

const patch = { sku, warrantyMonths: 1 }

const invoice: HUB2B_Invoice = {
    cfop: '1.111',
    issueDate: nowIsoDate(),
    key: '11111111111111111111111111111111111111111111',
    number: '111111111',
    packages: 1,
    series: '11111111111111',
    totalAmount: 1,
    xmlReference: '',
}

const rastreio: HUB2B_Tracking = {
    code: 'AR-1849-SIY',
    shippingDate: nowIsoDate(),
    shippingProvider: 'Correrios',
    shippingService: 'AR',
    url: 'http://track.product'
}

const status: HUB2B_Status = {
    active: true,
    message: 'Mensagem de teste',
    status: 'delivered',
    updatedDate: nowIsoDate()
}

const getTestInvoice = () => {
    return getInvoice( pedido1 )
}

const getTestTracking = () => {
    return getTracking( pedido1 )
}


const homologHub2b = async () => {

    const upProduct = await updateProduto( [patch] )

    const upPrice = await updatePrice( sku, 50, 45 )

    const upStock = await updateStock( sku, 50 )

    const listarPedidos = await listOrders()

    const upNFe = await postInvoice( pedido1, invoice )

    const track = await postTracking( pedido1, rastreio )

    const upStatus = await updateStatus( pedido1, status )

}
