//
//      Product Service
//

import { Product } from "../models/product"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
import { createNewProduct, findProductById, findProductsByShopId } from "../repositories/productRepository"

/**
 * Save a new product
 * 
 * @param body - valid product
 */
export const createProduct = async ( body: any ): Promise<Product | null> => {

    const {
        brand, category, description, images,
        name, nationality, price, sku, variations,
        ean, height, length, more_info,
        price_discounted, weight, width, shopId
    } = body

    const refProduct: Product = {
        brand, category, description, images,
        name, nationality, price, sku, variations,
        ean, height, length, more_info,
        price_discounted, weight, width, shopId
    }

    const product = await createNewProduct( refProduct )

    product
        ? log( `Product ${ product.name } has been created.`, 'EVENT', getFunctionName() )
        : log( `Product ${ product } has been created.`, 'EVENT', getFunctionName() )

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
