//
//      Activation Token Repository
//

import { MongoError, ObjectID, TransactionOptions } from "mongodb"
import { Product, Variation } from "../models/product"
import { productCollection, variationCollection } from "../utils/db/collections"
import { getMongoSession } from "../utils/db/mongoConnector"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Create new Product
 * 
 * @param product - the product to be saved
 */
export const createNewProduct = async ( product: Product, variations: Variation[] ): Promise<Product | null> => {

    const session = getMongoSession()

    const transactionOptions: TransactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    }

    let productResult

    try {

        const transactionResults = await session.withTransaction( async () => {

            const productResults = await productCollection.insertOne( product, { session } )

            console.log( productResults )

            productResult = productResults.ops[0] ? productResults.ops[0] : null

            variations.forEach( variation => variation.product_id = productResults.insertedId )

            const variationResults = await variationCollection.insertMany( variations, { session } )

            if ( productResult )
                productResult.variations = variationResults.ops ? variationResults.ops : null

            console.log( productResult )

        }, transactionOptions )

        // if ( transactionResults ) {
        //     console.log( "The reservation was successfully created." )
        // } else {
        //     console.log( "The transaction was intentionally aborted." )
        // }
        return null

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Activation Token Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    } finally {
        await session.endSession()
    }
}

/**
 * Create new Product
 * 
 * @param product - the product to be saved
 */
export const updateProductById = async ( patch: any ): Promise<Product | null> => {

    try {

        const options = {
            "$set": patch
        }

        const query = { _id: new ObjectID( patch._id ) }

        const result = await productCollection.findOneAndUpdate( query, options )

        return result.value ? result.value : null

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find product by id
 * 
 * @param productId
 */
export const findProductById = async ( productId: string ): Promise<Product | null> => {
    try {

        const projection = {
            shopId: 1, images: 1, category: 1, subCategory: 1,
            nationality: 1, name: 1, description: 1, brand: 1,
            more_info: 1, ean: 1, sku: 1, gender: 1,
            height: 1, width: 1, length: 1, weight: 1,
            price: 1, price_discounted: 1,
            variations: 1, isActive: 1
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
 * Find shop products
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
            variations: 1, isActive: 1
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
