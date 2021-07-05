//
//     Product Validation
//

import { COLORS } from "../models/color"
import { SIZES } from "../models/size"
import { AppError, invalidCategory, invalidEAN, invalidImageReference, invalidNationality, invalidProductBrand, invalidProductDescription, invalidProductGender, invalidProductName, invalidProductVariations, invalidSKU, invalidSubCategory, invalidVariationColor, invalidVariationHeight, invalidVariationLength, invalidVariationPrice, invalidVariationPriceDiscounted, invalidVariationSize, invalidVariationStock, invalidVariationWeight, invalidVariationWidth } from "../utils/errors/errors"
import { isNegativeNumber, isNotNumber } from "../utils/util"

/**
 * Verifies if the product is valid
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isNewProductValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( body.images && !Array.isArray( body.images ) ) errors.push( invalidImageReference )

    if ( !body.category ) errors.push( invalidCategory )

    if ( !body.subcategory ) errors.push( invalidSubCategory )

    if ( !body.nationality ) errors.push( invalidNationality )

    if ( !body.name || body.name.length < 2 ) errors.push( invalidProductName )

    if ( !body.description || body.description.length < 2 ) errors.push( invalidProductDescription )

    if ( !body.brand || body.brand.length < 2 ) errors.push( invalidProductBrand )

    if ( body.ean && body.ean.length < 2 ) errors.push( invalidEAN )

    if ( !body.sku || body.sku.length < 2 ) errors.push( invalidSKU )

    if ( !body.gender || ( body.gender !== 'M' && body.gender !== 'F' && body.gender !== 'U' ) ) errors.push( invalidProductGender )

    if ( !body.height || isNotNumber( body.height ) || isNegativeNumber( body.height ) ) errors.push( invalidVariationHeight )

    if ( !body.width || isNotNumber( body.width ) || isNegativeNumber( body.width ) ) errors.push( invalidVariationWidth )

    if ( !body.length || isNotNumber( body.length ) || isNegativeNumber( body.length ) ) errors.push( invalidVariationLength )

    if ( !body.weight || isNotNumber( body.weight ) || isNegativeNumber( body.weight ) ) errors.push( invalidVariationWeight )

    if ( !body.price || isNotNumber( body.price ) || isNegativeNumber( body.price ) ) errors.push( invalidVariationPrice )

    if ( !body.price_discounted || isNotNumber( body.price_discounted ) || isNegativeNumber( body.price_discounted ) ) errors.push( invalidVariationPriceDiscounted )

    if ( !body.variations || !Array.isArray( body.variations ) ) errors.push( invalidProductVariations )
    else {
        body.variations.forEach( ( variation: any ) => {

            const isSizeValid = SIZES.some( size => size === variation.size )

            const isColorValid = COLORS.some( color => color === variation.color )

            if ( variation.size && !isSizeValid ) errors.push( invalidVariationSize )

            if ( !variation.stock || isNotNumber( variation.stock ) || isNegativeNumber( variation.stock ) ) errors.push( invalidVariationStock )

            if ( variation.color && !isColorValid ) errors.push( invalidVariationColor )
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

    return errors
}

/**
 * Verifies if the variation can be patched
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isVariationPatchValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    return errors
}
