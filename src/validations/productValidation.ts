//
//     Product Validation
//

import { findShopInfoByUserID } from "../repositories/accountRepository"
import { findUserById } from "../repositories/userRepository"
import { findShop } from "../services/accountService"
import { AppError, invalidProduct } from "../utils/errors/errors"

/**
 * Verifies whether the user can update shop
 *
 * @param userId
 * @param shopId
 * @returns `true` if the user can access shop or `false` otherwise
 */
export const userCanAccessShop = async ( userId: any, shopId: any ): Promise<boolean> => {

    if ( !userId || !shopId ) return false

    const user = await findUserById( userId )

    const shop = await findShop( shopId )

    if ( user?._id != shop?.userId ) return false

    return true
}

/**
 * Verifies whether the new user can be created
 * 
 * @param body
 * @param headers
 * @returns `true` if new user can be created or `false` the other way around
 */
export const isNewProductValid = async ( body: any ): Promise<AppError[]> => {

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
