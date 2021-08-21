//
//      Product Service
//

import { Product, Variation } from "../models/product"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
import { createNewProduct, createVariation, deleteVariation, findProductById, findProductsByShopId, findVariationById, updateProductById, updateVariationById } from "../repositories/productRepository"
import productEventEmitter from "../events/product"

/**
 * Save a new product
 * 
 * @param body - valid product
 */
export const createProduct = async ( body: any ): Promise<Product | null> => {

    const {
        images,
        category,
        subcategory,
        nationality,
        name,
        description,
        brand,
        more_info,
        ean,
        sku,
        gender,
        height,
        width,
        length,
        weight,
        price,
        price_discounted,
        variations
    } = body

    const shop_id = body.shop

    const ref_product: Product = {
        shop_id,
        images,
        category,
        subcategory,
        nationality,
        name,
        description,
        brand,
        more_info,
        ean,
        sku,
        gender,
        height,
        width,
        length,
        weight,
        price,
        price_discounted,
        is_active: true
    }

    const product = await createNewProduct( ref_product, variations )

    if ( !product ) {
        log( `Product ${ product } has been created.`, 'EVENT', getFunctionName() )
        return null
    }

    log( `Product ${ product.name } has been created.`, 'EVENT', getFunctionName() )

    productEventEmitter.emit( 'create', product )

    return product
}

/**
 * Find a product by its id
 * 
 * @param product_id - product_id
 */
export const findProduct = async ( product_id: any ): Promise<Product | null> => {

    let product = await findProductById( product_id )

    product
        ? log( `Product ${ product.name } has been found.`, 'EVENT', getFunctionName() )
        : log( `Product ${ product_id } does not exist.`, 'EVENT', getFunctionName() )

    return product
}

/**
 * Find all products for a given shop id
 *
 * @param shop_id - shop_id
 */
export const findProductsByShop = async ( shop_id: any ): Promise<Product[] | null> => {

    const products = await findProductsByShopId( shop_id )

    products
        ? log( `Found ${ products.length } products for shop ${ shop_id }`, 'EVENT', getFunctionName() )
        : log( `Could not find any products`, 'EVENT', getFunctionName() )

    return products
}

/**
 * Update a product by its ID
 *
 * @param _id - product id
 */
export const updateProduct = async ( _id: any, patch: any ): Promise<Product | null> => {

    const product = await updateProductById( _id, patch )

    product
        ? log( `Update product ${ _id }`, 'EVENT', getFunctionName() )
        : log( `Could not update product`, 'EVENT', getFunctionName() )

    productEventEmitter.emit( 'update', product )

    return product
}

/**
 * Update a variation of product by its ID
 *
 * @param _id - variation id
 */
export const updateProductVariation = async ( _id: any, patch: any ): Promise<Product | null> => {

    const product = await updateVariationById( _id, patch )

    product
        ? log( `Update product ${ _id }`, 'EVENT', getFunctionName() )
        : log( `Could not update product`, 'EVENT', getFunctionName() )

    productEventEmitter.emit( 'update', product )

    return product
}

/**
 * Find variation by id
 *
 * @param variation_id - variation_id
 */
export const findVariation = async ( variation_id: any ): Promise<Variation | null> => {


    let variation = await findVariationById( variation_id )

    variation
        ? log( `Variation ${ variation._id } has been found.`, 'EVENT', getFunctionName() )
        : log( `Variation ${ variation_id } does not exist.`, 'EVENT', getFunctionName() )

    return variation
}

export const createNewVariation = async ( body: any ): Promise<Variation | null> => {

    const { product_id, stock, color, size, voltage, flavor, gluten_free, lactose_free } = body

    let ref_variation: Variation = { product_id, stock }

    if ( color ) ref_variation = Object.assign( ref_variation, { color } )

    if ( size ) ref_variation = Object.assign( ref_variation, { size } )

    if ( voltage ) ref_variation = Object.assign( ref_variation, { voltage } )

    if ( flavor ) ref_variation = Object.assign( ref_variation, { flavor } )

    if ( gluten_free ) ref_variation = Object.assign( ref_variation, { gluten_free } )

    if ( lactose_free ) ref_variation = Object.assign( ref_variation, { lactose_free } )

    let variation = await createVariation( ref_variation )

    variation
        ? log( `Variation ${ variation._id } has been created.`, 'EVENT', getFunctionName() )
        : log( `Variation could not be created.`, 'EVENT', getFunctionName() )

    return variation
}

/**
 * Find a product variation by variation id
 * 
 * @param variation_id - variation_id
 */
export const findProductVariation = async ( variation_id: any ): Promise<Product | null> => {

    let variation = await findVariation( variation_id )

    if ( !variation ) {
        log( `Variation ${ variation_id } does not exist.`, 'EVENT', getFunctionName() )
        return null
    }

    let product = await findProduct( variation.product_id )

    if ( !product ) {
        log( `Product ${ variation.product_id } does not exist.`, 'EVENT', getFunctionName() )
        return null
    }

    log( `Product ${ product.name } has been found.`, 'EVENT', getFunctionName() )

    product.variations = [variation]

    return product
}

export const deleteVariationById = async ( variation_id: string ): Promise<boolean> => {

    let result = await deleteVariation( variation_id )

    result
        ? log( `Variation has been deleted.`, 'EVENT', getFunctionName() )
        : log( `Variation could not be deleted.`, 'EVENT', getFunctionName() )

    return result
}
