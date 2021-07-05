//
//      Activation Token Repository
//

import { MongoError, ObjectID, TransactionOptions } from "mongodb"
import { Product, Variation } from "../models/product"
import { productCollection, variationCollection, VARIATION_COLLECTION } from "../utils/db/collections"
import { getMongoSession } from "../utils/db/mongoConnector"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

const transactionOptions: TransactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
}


/**
 * Create new Product
 * 
 * @param product - the product to be saved
 */
export const createNewProduct = async ( product: Product, variations: Variation[] ): Promise<Product | null> => {

    const session = getMongoSession()

    let productResult: Product | null = null

    try {

        const transactionResults = await session.withTransaction( async () => {

            const productResults = await productCollection.insertOne( product, { session } )

            productResult = productResults.ops[0] ? productResults.ops[0] : null

            if ( !productResult ) throw new MongoError( "Could not save product." )

            variations.forEach( variation => variation.product_id = productResults.insertedId )

            const variationResults = await variationCollection.insertMany( variations, { session } )

            productResult.variations = variationResults.ops ? variationResults.ops : null

        }, transactionOptions )

        return productResult

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Product Repository - ${ getFunctionName() }`, 'ERROR' )

        return null

    } finally {

        await session.endSession()
    }
}

/**
 * Update a product
 * 
 * @param product 
 */
export const updateProductById = async ( _id: any, patch: any ): Promise<Product | null> => {

    try {

        const filter = { _id: new ObjectID( _id ) }

        const update = {
            $set: { ...patch }
        }

        const result = await productCollection.findOneAndUpdate( filter, update )

        if ( !result.value ) return null

        return await findProductById( result.value._id )

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Product Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Update a variation
 * 
 * @param patch - 
 */
export const updateVariationById = async ( _id: any, patch: any ): Promise<Product | null> => {

    try {

        const options = {
            $set: { ...patch }
        }

        const query = { _id: new ObjectID( _id ) }

        const result = await variationCollection.findOneAndUpdate( query, options )

        if ( !result.value ) return null

        return await findProductById( result.value.product_id )

    } catch ( error ) {

        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Product Repository - ${ getFunctionName() }`, 'ERROR' )

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

        const query = { _id: new ObjectID( productId ) }

        const productsCursor = await productCollection.aggregate( [
            {
                $lookup:
                {
                    from: VARIATION_COLLECTION,
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variations"
                }
            },
            { $match: query }
        ] )

        if ( !productsCursor ) throw new MongoError( "Could not retrieve product." )

        const product = await productsCursor.toArray()

        return product[0]

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Product Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Find shop products
 * 
 * @param shopId
 */
export const findProductsByShopId = async ( shop_id: string ): Promise<Product[] | null> => {

    try {

        const query = { shop_id }

        const productsCursor = await productCollection.aggregate( [
            {
                $lookup:
                {
                    from: VARIATION_COLLECTION,
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variations"
                }
            },
            { $match: query },
            { $sort: { _id: -1 } }
        ] )

        if ( !productsCursor ) throw new MongoError( "Could not retrieve products." )

        const products = await productsCursor.toArray()

        return products

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Product Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Find variations by product id
 * 
 * @param product_id
 */
export const findVariationsByProductId = async ( product_id: string ): Promise<Variation[] | null> => {

    try {

        const query = { product_id: new ObjectID( product_id ) }

        const variationsCursor = await variationCollection.find( query )

        const variations = await variationsCursor.toArray()

        return variations

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Product Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Find variation by id
 * 
 * @param variation_id
 */
export const findVariationById = async ( variation_id: string ): Promise<Variation | null> => {

    try {

        const query = { _id: new ObjectID( variation_id ) }

        const variation = await variationCollection.findOne( query )

        return variation

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Product Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}
