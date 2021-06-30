//
//      HUB2B Service
//

import axios from "axios"
import { Product } from "../models/product"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

// Default
const headers = {
    'Content-Type': 'application/json'
}

// API v1 -- Integração de produtos e categorias
const URL_V1 = "https://eb-api.plataformahub.com.br/RestServiceImpl.svc"
const IdTenant = 2032
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

const productExample = {
    "sku": "testeWithTemplate2",
    "parentSKU": "",
    "ean13": "6669996669990",
    "warrantyMonths": 30,
    "handlingTime": 2,
    "stock": "7",
    "weightKg": "5.2",
    "url": "http://testes.com",
    "sourceId": "999",
    "categoryCode": "123",
    "name": "product testeWithTemplate2 teste 84",
    "sourceDescription": "product testeWithTemplate2 Base desc",
    "description": "product testeWithTemplate2",
    "brand": "marca teste",
    "videoURL": "http://videourl.com",
    "ncm": "",
    "idProductType": 1,
    "idTypeCondition": 1,
    "shippingType": "me1;me2",
    "height_m": "1",
    "width_m": "0.1",
    "length_m": "1",
    "priceBase": "357.64",
    "priceSale": "357.64",
    "images": [
        {
            "url": "http://www.images.com/teste"
        }, {
            "url": "http://www.images.com/2/teste"
        }
    ],
    "specifications": [
        {
            "name": "Garantia",
            "value": "30 dias",
            "type": 2
        }, {
            "name": "Especificações",
            "value": "é teste!",
            "type": 2
        }
    ]
}

interface HUB2B_Product {
    sku: any,
    parentSKU: string,
    ean13: string | undefined,
    warrantyMonths: number,
    handlingTime: number,
    stock: string,
    weightKg: string | undefined,
    url: string,
    sourceId: string,
    categoryCode: string,
    name: string,
    sourceDescription: string,
    description: string,
    brand: string,
    videoURL?: string,
    ncm: string,
    idProductType: number,
    idTypeCondition: number,
    shippingType: string,
    height_m: string | undefined,
    width_m: string | undefined,
    length_m: string | undefined,
    priceBase: string,
    priceSale: string,
    images: {
        url: string
    }[],
    specifications: {
        name: string,
        value: string,
        type: number
    }[]
}[]

export const criarProdutoHub2b = async ( produto: Product | null ) => {


    const URL = URL_V1 + "/setsku/" + IdTenant

    let hub2productList: HUB2B_Product[] = []

    if ( produto ) {

        const imageList = produto.images.map( url => {
            return { url }
        } )

        produto.variations?.forEach( variation => {

            const productHub2: HUB2B_Product = {
                sku: produto._id,
                parentSKU: produto.sku,
                ean13: produto.ean,
                warrantyMonths: 30,
                handlingTime: 2,
                stock: `${ variation.stock }`,
                weightKg: `${ produto.weight * 1000 }`,
                url: `https://seller-center.ozllo.com.br/product/${ produto._id }`,
                sourceId: produto._id,
                categoryCode: `${ produto.category }`,
                name: produto.name,
                sourceDescription: produto.description,
                description: produto.description,
                brand: produto.brand,
                videoURL: "",
                ncm: "",
                idProductType: 1.,
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
    } else {
        hub2productList.push( productExample )
    }

    try {

        const response = await axios.post( URL, hub2productList, { headers: headersV1 } )

        const sku = response

        sku
            ? log( "Produto cadastrado com sucesso no HUB2B", "EVENT", getFunctionName(), "INFO" )
            : log( "Não foi possível cadastrar produto no HUB2B", "EVENT", getFunctionName(), "WARN" )

        return sku

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "WARN" )
        return null
    }

}

export const generateAccessTokenV2 = async () => {

    const headers = {
        'Content-Type': 'application/json'
    }

    const URL_TOKEN = "https://rest.hub2b.com.br/oauth2/login"

    const body = { client_id, client_secret, grant_type, scope, username, password }

    try {
        const response = await axios.post( URL_TOKEN, body, { headers } )

        credentials = response.data

        credentials.access_token
            ? log( "Token atualizado com sucesso", "EVENT", getFunctionName(), "INFO" )
            : log( "Não foi passível obter o token de acesso", "EVENT", getFunctionName(), "WARN" )

    } catch ( error ) {
        if ( error instanceof Error )
            log( error.message, "EVENT", getFunctionName(), "WARN" )
        return null
    }

}

