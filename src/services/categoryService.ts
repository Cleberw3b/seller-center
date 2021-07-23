//
//      Token Service
//

import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
import { CATEGORIES, Category, SUBCATEGORIES, SubCategory } from "../models/category"
import { ATTRIBUTES, Category_Attribute } from "../models/attribute"

/**
 * List category
 * 
 */
export const getAllCategories = async (): Promise<Category[]> => {

    const categories = CATEGORIES

    categories
        ? log( `Listing categories`, 'EVENT', getFunctionName() )
        : log( `Could not retrieve category list.`, 'EVENT', getFunctionName(), 'ERROR' )

    return categories
}

/**
 * List subcategories from category
 * 
 * @param category_code  `category_code`
 */
export const getAllSubCategories = async ( category_code: number ): Promise<SubCategory[]> => {

    const subcategories = SUBCATEGORIES.filter( subcategory => subcategory.categoryCode === category_code )

    subcategories
        ? log( `Listing sub categories`, 'EVENT', getFunctionName() )
        : log( `Could not retrieve sub category list.`, 'EVENT', getFunctionName(), 'ERROR' )

    return subcategories
}

/**
 * Retrieve a category that has the same code
 * 
 * @param code  `code`
 */
export const getCategory = async ( code: number ): Promise<Category[]> => {

    const category = CATEGORIES.filter( category => category.code === code )

    category
        ? log( `Category ${ category } found`, 'EVENT', getFunctionName() )
        : log( `Could not retrieve category.`, 'EVENT', getFunctionName(), 'ERROR' )

    return category
}


/**
 * Retrieve a subcategory that has the same code
 * 
 * @param code  `code`
 */
export const getSubCategory = async ( code: number ): Promise<SubCategory[]> => {

    const subcategory = SUBCATEGORIES.filter( subcategory => subcategory.code === code )

    subcategory
        ? log( `Subcategory ${ subcategory } found`, 'EVENT', getFunctionName() )
        : log( `Could not retrieve subcategory.`, 'EVENT', getFunctionName(), 'ERROR' )

    return subcategory
}


/**
 * Retrieve a category attributes that has the same code
 * 
 * @param code  `code`
 */
export const getCategoryAttributes = async ( code: number ): Promise<Category_Attribute[]> => {

    const attributes = ATTRIBUTES.filter( attributes => attributes.category === code )

    attributes
        ? log( `ATTRIBUTES ${ attributes } found`, 'EVENT', getFunctionName() )
        : log( `Could not retrieve attributes.`, 'EVENT', getFunctionName(), 'ERROR' )

    return attributes
}
