//
//      Activation Token Repository
//

import { MongoError } from "mongodb"
import { Product } from "../models/product"
import { productCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save activation token
 * 
 * @param activationToken - the token to be saved
 */
export const createNewProduct = async ( product: Product ): Promise<Product | null> => {
    try {

        const result = await productCollection.insertOne( product )

        return result.ops[0] ? result.ops[0] : null

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find activation token by token string
 * 
 * @param productId
 */
export const findProductById = async ( productId: string ): Promise<Product | null> => {
    try {

        const projection = {
            shopId: 1,
            images: 1,
            category: 1,
            subCategory: 1,
            nationality: 1,
            name: 1,
            description: 1,
            brand: 1,
            more_info: 1,
            ean: 1,
            sku: 1,
            gender: 1,
            height: 1,
            width: 1,
            length: 1,
            weight: 1,
            price: 1,
            price_discounted: 1,
            variations: 1
        }

        const product = await productCollection.findOne( { productId }, { projection } )

        return product

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find activation token by token string
 * 
 * @param shopId
 */
export const findProductsByShopId = async ( shopId: string ): Promise<Product[] | null> => {
    try {

        const query = { shopId }

        const projection = {
            images: 1, name: 1, description: 1,
            brand: 1, price: 1, price_discounted: 1,
            nationality: 1, category: 1, sku: 1,
            variations: 1
        }

        const options = { sort: { _id: -1 }, projection }

        const cursor = await productCollection.find( query, options )

        const result = cursor.toArray()

        return result

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}
