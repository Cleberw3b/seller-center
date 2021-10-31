//
//     Product Validation
//

import { COLORS } from "../models/color"
import { FLAVORS } from "../models/flavors"
import { AppError, invalidCategory, invalidEAN, invalidImageReference, invalidNationality, invalidProductBrand, invalidProductDescription, invalidProductGender, invalidProductName, invalidProductVariations, invalidSKU, invalidSubCategory, invalidVariationColor, invalidVariationFlavor, invalidVariationHeight, invalidVariationLength, invalidVariationPrice, invalidVariationPriceDiscounted, invalidVariationSize, invalidVariationStock, invalidVariationVoltage, invalidVariationWeight, invalidVariationWidth } from "../utils/errors/errors"
import { isNegativeNumber, isNotNumber, parsePotentiallyGroupedFloat } from "../utils/util"

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

    if ( body.price ) body.price = parsePotentiallyGroupedFloat( body.price )

    if ( body.price_discounted ) body.price_discounted = parsePotentiallyGroupedFloat( body.price_discounted )

    if ( !body.price || isNotNumber( body.price ) || isNegativeNumber( body.price ) ) errors.push( invalidVariationPrice )

    if ( !body.price_discounted || isNotNumber( body.price_discounted ) || isNegativeNumber( body.price_discounted ) ) errors.push( invalidVariationPriceDiscounted )

    if ( !body.variations || !Array.isArray( body.variations ) ) errors.push( invalidProductVariations )

    else body.variations.forEach( ( variation: any ) => errors.concat( isNewVariationValid( variation ) ) )

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
 * Verifies if the product's price can be patched
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isProductPricePatchValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    const isPrice = body.price ? true : false

    const isPriceDiscounted = body.price_discounted ? true : false

    if ( body.price ) body.price = parsePotentiallyGroupedFloat( body.price )

    if ( body.price_discounted ) body.price_discounted = parsePotentiallyGroupedFloat( body.price_discounted )

    if ( isPrice && !body.price || isNotNumber( body.price ) || isNegativeNumber( body.price ) ) errors.push( invalidVariationPrice )

    if ( isPriceDiscounted && !body.price_discounted || isNotNumber( body.price_discounted ) || isNegativeNumber( body.price_discounted ) ) errors.push( invalidVariationPriceDiscounted )

    return errors
}

/**
 * Verifies if the variation's stock can be patched
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isProductStockPatchValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.stock || isNotNumber( body.stock ) || isNegativeNumber( body.stock ) || !Number.isInteger( body.stock ) ) errors.push( invalidVariationStock )

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

/**
 * Verifies if the variation can be patched
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isNewVariationValid = ( body: any ): AppError[] => {

    const errors: AppError[] = []

    if ( !body.stock || isNotNumber( body.stock ) || isNegativeNumber( body.stock ) ) errors.push( invalidVariationStock )

    if ( body.size && body.size.length < 1 ) errors.push( invalidVariationSize )

    if ( body.color && !isColorValid( body.color ) ) errors.push( invalidVariationColor )

    if ( body.flavor && !isFlavorValid( body.flavor ) ) errors.push( invalidVariationFlavor )

    if ( body.voltage && !isVoltageValid( body.voltage ) ) errors.push( invalidVariationVoltage )

    return errors
}

export const isColorValid = ( _color: string ): boolean => {
    return COLORS.some( color => color === _color )
}

export const isFlavorValid = ( _flavor: string ): boolean => {
    return FLAVORS.some( flavor => flavor === _flavor )
}

export const isVoltageValid = ( voltage: string ): boolean => {

    if ( voltage === '110' ) return true

    if ( voltage === '220' ) return true

    if ( voltage === 'bivolt' ) return true

    return false
}
