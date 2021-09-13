//
//      HUB2B Service
//

import axios, { Method } from "axios"
import { HUB2B_Invoice, HUB2B_Product, HUB2B_Status, HUB2B_Tracking } from "../models/hub2b"
import { Product } from "../models/product"
import { SALES_CHANNEL_HUB2B } from "../models/salesChannelHub2b"
import { HUB2B_ACCESS_KEY_V1, HUB2B_URL_V2, PROJECT_HOST, HUB2B_CLIENT_ID, HUB2B_CLIENT_SECRET, HUB2B_USERNAME, HUB2B_PASSWORD, HUB2B_TENANT, HUB2B_URL_V1 } from "../utils/consts"
import { log } from "../utils/loggerUtil"
import { getFunctionName, nowInSeconds, nowIsoDate } from "../utils/util"

// Default
const default_headers = {
    'Content-Type': 'application/json'
}

// API v1 -- Integração de produtos e categorias
const headersV1 = {
    ...default_headers,
    "auth": HUB2B_ACCESS_KEY_V1
}

// API v2 -- Integração de preço/estoque e pedidos

const optionsV2 = {
    grant_type: "password",
    scope: "inventory orders catalog"
}

let credentials = {
    access_token: '',
    expires_in: 7200,
    refresh_token: '',
    token_type: 'bearer',
    update_at: 0
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

export const generateAccessTokenV2Hub2b = async () => {

    const URL_OAUTH = HUB2B_URL_V2 + "/oauth2/login"

    const body = {
        client_id: HUB2B_CLIENT_ID,
        client_secret: HUB2B_CLIENT_SECRET,
        username: HUB2B_USERNAME,
        password: HUB2B_PASSWORD,
        ...optionsV2
    }

    const response = await requestHub2B( URL_OAUTH, 'POST', body )

    if ( !response ) return null

    credentials = response.data

    credentials.access_token
        ? log( "Token atualizado com sucesso", "EVENT", getFunctionName() )
        : log( "Não foi passível obter o token de acesso", "EVENT", getFunctionName(), "WARN" )

    credentials.update_at = nowInSeconds() / 60

    return credentials.access_token
}

export const isAccessTokenValidHub2b = () => {

    if ( !credentials.access_token ) return false

    if ( !credentials.update_at ) return false

    if ( credentials.update_at + credentials.expires_in >= nowInSeconds() / 60 ) return false

}

export const renewAccessTokenHub2b = async ( force = false ) => {

    if ( !force ) if ( isAccessTokenValidHub2b() ) return

    const URL_REFRESH = HUB2B_URL_V2 + "/oauth2/token"

    const body = {
        client_id: HUB2B_CLIENT_ID,
        client_secret: HUB2B_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: credentials.refresh_token
    }

    const response = await requestHub2B( URL_REFRESH, 'POST', body )

    if ( !response ) return await generateAccessTokenV2Hub2b()

    credentials = response.data

    credentials.access_token
        ? log( "Token atualizado com sucesso", "EVENT", getFunctionName() )
        : log( "Não foi passível obter o token de acesso", "EVENT", getFunctionName(), "WARN" )

    credentials.update_at = nowInSeconds() / 60

    return credentials.access_token
}

export const setupIntegrationHub2b = async () => {

    const SETUP_URL = HUB2B_URL_V2 + "/Setup/integration"

    const body = {
        system: "ERPOrdersNotification",
        idTenant: HUB2B_TENANT,
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


export const parseProdutoToProdutoHub2 = ( produto: Product ): HUB2B_Product[] => {

    const produtosHub2b: HUB2B_Product[] = []

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
            categoryCode: `${ produto.subcategory }`,
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

        produtosHub2b.push( productHub2 )
    } )

    return produtosHub2b
}

export const criarProdutoHub2b = async ( hub2productList: HUB2B_Product[] ) => {

    const URL = HUB2B_URL_V1 + "/setsku/" + HUB2B_TENANT

    const response = await requestHub2B( URL, 'POST', hub2productList, headersV1 )

    if ( response?.data.error ) {

        log( "Não foi possível cadastrar produto no HUB2B", "EVENT", getFunctionName(), "WARN" )

        return null
    }

    log( "Produto cadastrado com sucesso no HUB2B", "EVENT", getFunctionName() )
}

export const updateProdutoHub2b = async ( patch: any[] ) => {

    const URL = HUB2B_URL_V1 + "/setsku/" + HUB2B_TENANT

    const response = await requestHub2B( URL, 'POST', patch, headersV1 )

    if ( !response ) return null

    if ( response?.data.error ) {

        log( "Não foi possível atualizar produto no HUB2B", "EVENT", getFunctionName(), "WARN" )

        return null
    }

    log( "Produto atualizado com sucesso no HUB2B", "EVENT", getFunctionName() )

}

export const deleteProdutoHub2b = async ( product_id: string ) => {

    const URL = HUB2B_URL_V1 + "/removeproduct/" + HUB2B_TENANT

    const body = SALES_CHANNEL_HUB2B.map( channel => {
        return {
            itemId: product_id,
            salesChannel: channel.code
        }
    } )

    const response = await requestHub2B( URL, 'POST', body, headersV1 )

    if ( !response ) return null

    if ( response?.data.error ) {

        log( "Não foi possível deletar produto no HUB2B", "EVENT", getFunctionName(), "WARN" )

        return null
    }

    log( "Produto deletado com sucesso no HUB2B", "EVENT", getFunctionName() )
}

export const getSKU = async ( sku: string ) => {

    await generateAccessTokenV2Hub2b()

    const URL_STOCK = `https://eb-api-sandbox.plataformahub.com.br/RestServiceImpl.svc/listskus/${ HUB2B_TENANT }?filter=sku:${ sku }`

    const response = await requestHub2B( URL_STOCK )

    if ( !response ) return null

    const product = response.data

    product
        ? log( "Get List Orders success", "EVENT", getFunctionName() )
        : log( "Get List Orders error", "EVENT", getFunctionName(), "WARN" )

    return product
}

export const getStockHub2b = async ( variation_id: any ) => {

    await generateAccessTokenV2Hub2b()

    const URL_STOCK = HUB2B_URL_V2 + `/inventory/${ variation_id }/stocks` + "?access_token=" + credentials.access_token

    const response = await requestHub2B( URL_STOCK )

    if ( !response ) return null

    const stock = response.data[0]

    stock
        ? log( "Get List Orders success", "EVENT", getFunctionName() )
        : log( "Get List Orders error", "EVENT", getFunctionName(), "WARN" )

    return stock
}

export const updateStockHub2b = async ( variation_id: any, stock: number ) => {

    await renewAccessTokenHub2b()

    const URL_STOCK = HUB2B_URL_V2 + `/inventory/${ variation_id }/stocks` + "?access_token=" + credentials.access_token

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

export const updatePriceHub2b = async ( variation_id: any, price: number, price_discounted: number ) => {

    await renewAccessTokenHub2b()

    const URL_PRICE = HUB2B_URL_V2 + `/inventory/${ variation_id }/price` + "?access_token=" + credentials.access_token

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
export const postOrderHub2b = async () => {

    await renewAccessTokenHub2b()

    const URL_ORDERS = HUB2B_URL_V2 + "/Orders" + "?access_token=" + credentials.access_token

    const body = {}

    const response = await requestHub2B( URL_ORDERS, 'POST', body )

    if ( !response ) return null

    const orders = response.data.response

    orders
        ? log( "POST Orders success", "EVENT", getFunctionName() )
        : log( "POST Orders error", "EVENT", getFunctionName(), "WARN" )

    return orders
}

export const listOrdersHub2b = async ( ordersNumber?: string[] ) => {

    await renewAccessTokenHub2b()

    let URL_ORDERS = ''

    if ( ordersNumber ) {

        let orderParam = ''

        for ( const orderNumber of ordersNumber ) {
            orderParam += orderNumber + ","
        }

        orderParam = orderParam.substr( 0, orderParam.length - 1 )

        URL_ORDERS = HUB2B_URL_V2 + "/Orders" + "?number=" + orderParam + "&access_token=" + credentials.access_token

    } else
        URL_ORDERS = HUB2B_URL_V2 + "/Orders" + "?access_token=" + credentials.access_token

    const response = await requestHub2B( URL_ORDERS )

    if ( !response ) return null

    const orders = response.data.response

    orders
        ? log( "Get List Orders success", "EVENT", getFunctionName() )
        : log( "Get List Orders error", "EVENT", getFunctionName(), "WARN" )

    return orders
}

export const postInvoiceHub2b = async ( order_id: string, _invoice: HUB2B_Invoice ) => {

    await renewAccessTokenHub2b()

    const URL_INVOICE = HUB2B_URL_V2 + `/Orders/${ order_id }/Invoice` + "?access_token=" + credentials.access_token

    const body = _invoice

    const response = await requestHub2B( URL_INVOICE, "POST", body )

    if ( !response ) return null

    const invoice = response.data

    invoice
        ? log( "POST Invoice success", "EVENT", getFunctionName() )
        : log( "POST Invoice error", "EVENT", getFunctionName(), "WARN" )

    return invoice
}

export const getInvoiceHub2b = async ( order_id: string ) => {

    await renewAccessTokenHub2b()

    const URL_INVOICE = HUB2B_URL_V2 + `/Orders/${ order_id }/Invoice` + "?access_token=" + credentials.access_token

    const response = await requestHub2B( URL_INVOICE )

    if ( !response ) return null

    const invoice = response.data

    invoice
        ? log( "Get Invoice success", "EVENT", getFunctionName() )
        : log( "Get Invoice error", "EVENT", getFunctionName(), "WARN" )

    return invoice
}

// Não é permitido enviar os dados de rastreio sem antes ter enviado a nota fiscal.
export const postTrackingHub2b = async ( order_id: string, _tracking: HUB2B_Tracking ) => {

    await renewAccessTokenHub2b()

    const URL_TRACKING = HUB2B_URL_V2 + `/Orders/${ order_id }/Tracking` + "?access_token=" + credentials.access_token

    const body = _tracking

    const response = await requestHub2B( URL_TRACKING, "POST", body )

    if ( !response ) return null

    const tracking = response.data

    tracking
        ? log( "POST Tracking success", "EVENT", getFunctionName() )
        : log( "POST Tracking error", "EVENT", getFunctionName(), "WARN" )

    return tracking
}

export const getTrackingHub2b = async ( order_id: string ) => {

    await renewAccessTokenHub2b()

    const URL_TRACKING = HUB2B_URL_V2 + `/Orders/${ order_id }/Tracking` + "?access_token=" + credentials.access_token

    const response = await requestHub2B( URL_TRACKING )

    if ( !response ) return null

    const tracking = response.data

    tracking
        ? log( "Get Tracking success", "EVENT", getFunctionName() )
        : log( "Get Tracking error", "EVENT", getFunctionName(), "WARN" )

    return tracking
}


export const updateStatusHub2b = async ( order_id: string, _status: HUB2B_Status ) => {

    await renewAccessTokenHub2b()

    const URL_STATUS = HUB2B_URL_V2 + `/Orders/${ order_id }/Status` + "?access_token=" + credentials.access_token

    const body = _status

    const response = await requestHub2B( URL_STATUS, 'PUT', body )

    if ( !response ) return null

    const status = response.data

    status
        ? log( "Get Tracking success", "EVENT", getFunctionName() )
        : log( "Get Tracking error", "EVENT", getFunctionName(), "WARN" )

    return status
}

generateAccessTokenV2Hub2b()

setInterval( async () => {
    await renewAccessTokenHub2b()
}, 1000 * 60 * 7 )

setInterval( async () => {
    await renewAccessTokenHub2b( true )
}, 1000 * 60 * 23 )




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
    return getInvoiceHub2b( pedido1 )
}

const getTestTracking = () => {
    return getTrackingHub2b( pedido1 )
}


const homologHub2b = async () => {

    const upProduct = await updateProdutoHub2b( [patch] )

    const upPrice = await updatePriceHub2b( sku, 50, 45 )

    const upStock = await updateStockHub2b( sku, 50 )

    const listarPedidos = await listOrdersHub2b()

    const upNFe = await postInvoiceHub2b( pedido1, invoice )

    const track = await postTrackingHub2b( pedido1, rastreio )

    const upStatus = await updateStatusHub2b( pedido1, status )

}
