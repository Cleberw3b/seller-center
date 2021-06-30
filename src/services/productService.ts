//
//      Product Service
//

import { Product } from "../models/product"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
import { createNewProduct, findProductById, findProductsByShopId, updateProductById, updateVariationById } from "../repositories/productRepository"
import { criarProdutoHub2b } from "./hub2b"

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

    const refProduct: Product = {
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

    const product = await createNewProduct( refProduct, variations )

    product
        ? log( `Product ${ product.name } has been created.`, 'EVENT', getFunctionName() )
        : log( `Product ${ product } has been created.`, 'EVENT', getFunctionName() )


    criarProdutoHub2b( product )

    return product
}

/**
 * Find a product by its id
 * 
 * @param productId - productId
 */
export const findProduct = async ( productId: any ): Promise<Product | null> => {

    let product = await findProductById( productId )

    product
        ? log( `Product ${ product.name } has been found.`, 'EVENT', getFunctionName() )
        : log( `Product ${ productId } does not exist.`, 'EVENT', getFunctionName() )

    return product
}

/**
 * Find all products for a given shop id
 *
 * @param shopId - shopId
 */
export const findProductsByShop = async ( shopId: any ): Promise<Product[] | null> => {

    const products = await findProductsByShopId( shopId )

    products
        ? log( `Found ${ products.length } products for shop ${ shopId }`, 'EVENT', getFunctionName() )
        : log( `Could not find any products`, 'EVENT', getFunctionName() )

    return products
}

/**
 * Update a product by its ID
 *
 * @param _id - product id
 */
export const updateProduct = async ( _id: any, patch: any ): Promise<Product | null> => {

    const products = await updateProductById( _id, patch )

    products
        ? log( `Update product ${ _id }`, 'EVENT', getFunctionName() )
        : log( `Could not update product`, 'EVENT', getFunctionName() )

    return products
}



/**
 * Update a variation of product by its ID
 *
 * @param _id - variation id
 */
export const updateProductVariation = async ( _id: any, patch: any ): Promise<Product | null> => {

    const products = await updateVariationById( _id, patch )

    products
        ? log( `Update product ${ _id }`, 'EVENT', getFunctionName() )
        : log( `Could not update product`, 'EVENT', getFunctionName() )

    return products
}
