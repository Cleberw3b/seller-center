//
//      Token Service
//

import { User } from "../models/user"
import { ActivationToken } from "../models/token"
import { createNewActivationToken, deleteToken, findActivationTokenByToken } from "../repositories/tokenRepository"
import { log } from "../utils/loggerUtil"
import { create_UUID, getFunctionName, nowInSeconds } from "../utils/util"
import { CATEGORIES, Category, SUB_CATEGORIES } from "../models/category"

/**
 * List category
 * 
 * @param user  `User`
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
 * @param user  `User`
 */
export const getAllSubCategories = async ( category_code: number ): Promise<Category[]> => {

    const sub_categories = SUB_CATEGORIES.filter( sub_category => sub_category.categoryCode === category_code )

    sub_categories
        ? log( `Listing sub categories`, 'EVENT', getFunctionName() )
        : log( `Could not retrieve sub category list.`, 'EVENT', getFunctionName(), 'ERROR' )

    return sub_categories
}
