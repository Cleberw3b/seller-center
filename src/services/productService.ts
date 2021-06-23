//
//      Product Service
//

import { Product } from "../models/product"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
import { createNewProduct, findProductById, findProductsByShopId, updateProductById } from "../repositories/productRepository"
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
        subCategory,
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

    const shopId = body.shop

    const refProduct: Product = {
        shopId,
        images,
        category,
        subCategory,
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
        isActive: true
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
 * Find all products for a given shop id
 *
 * @param shopId - shopId
 */
export const updateProduct = async ( body: any ): Promise<Product | null> => {

    const products = await updateProductById( body )

    products
        ? log( `Found ${ products.length } products for shop ${ body._id }`, 'EVENT', getFunctionName() )
        : log( `Could not find any products`, 'EVENT', getFunctionName() )

    return products
}
