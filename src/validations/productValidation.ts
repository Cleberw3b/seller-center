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

    // if ( !body.images ) errors.push( invalidProduct )

    // if ( !body.name ) errors.push( invalidProduct )

    // if ( !body.description ) errors.push( invalidProduct )

    // if ( !body.brand ) errors.push( invalidProduct )

    // if ( !body.sku ) errors.push( invalidProduct )

    // if ( !body.price ) errors.push( invalidProduct )

    // if ( !body.variations ) errors.push( invalidProduct )
    // else {
    //     if ( !body.variations.size ) errors.push( invalidProduct )
    //     if ( !body.variations.stock ) errors.push( invalidProduct )
    //     if ( !body.variations.color ) errors.push( invalidProduct )
    // }

    // if ( !body.nationality ) errors.push( invalidProduct )
    // else {
    //     if ( !body.nationality.id ) errors.push( invalidProduct )
    //     if ( !body.nationality.name ) errors.push( invalidProduct )
    // }

    // if ( !body.category ) errors.push( invalidProduct )
    // else {
    //     if ( !body.category.id ) errors.push( invalidProduct )
    //     if ( !body.category.name ) errors.push( invalidProduct )
    //     if ( !body.category.sub_category ) errors.push( invalidProduct )
    //     else {
    //         if ( !body.category.sub_category.id ) errors.push( invalidProduct )
    //         if ( !body.category.sub_category.name ) errors.push( invalidProduct )
    //     }
    // }

    return errors
}
