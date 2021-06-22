//
//     Product Validation
//

import { AppError, invalidProduct } from "../utils/errors/errors"

/**
 * Verifies if the product is valid
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isProductValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( body.images && !Array.isArray( body.images ) ) errors.push( invalidProduct )

    if ( !body.category ) errors.push( invalidProduct )

    if ( !body.subCategory ) errors.push( invalidProduct )

    if ( !body.nationality ) errors.push( invalidProduct )

    if ( !body.name ) errors.push( invalidProduct )

    if ( !body.description ) errors.push( invalidProduct )

    if ( !body.brand ) errors.push( invalidProduct )

    if ( !body.more_info ) errors.push( invalidProduct )

    if ( !body.ean ) errors.push( invalidProduct )

    if ( !body.sku ) errors.push( invalidProduct )

    if ( !body.gender ) errors.push( invalidProduct )

    if ( !body.height ) errors.push( invalidProduct )

    if ( !body.width ) errors.push( invalidProduct )

    if ( !body.length ) errors.push( invalidProduct )

    if ( !body.weight ) errors.push( invalidProduct )

    if ( !body.price ) errors.push( invalidProduct )

    if ( !body.price_discounted ) errors.push( invalidProduct )

    if ( !body.variations || !Array.isArray( body.variations ) ) errors.push( invalidProduct )
    else {
        body.variations.forEach( ( variation: any ) => {
            if ( !variation.size ) errors.push( invalidProduct )
            if ( !variation.stock ) errors.push( invalidProduct )
            if ( !variation.color ) errors.push( invalidProduct )
        } )
    }

    return errors
}


/**
 * Verifies if the product can be patched
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isProductPatchValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body._id ) errors.push( invalidProduct )

    return errors
}
