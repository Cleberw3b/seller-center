//
//      Token Service
//

import { Order } from "../models/order"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * List all orders from a shop
 * 
 * @param shop_id Shop ID
 */
export const findOrdersByShop = async ( shop_id: any ): Promise<Order[] | null> => {

    const orders = null

    orders
        ? log( `Listing categories`, 'EVENT', getFunctionName() )
        : log( `Could not retrieve category list.`, 'EVENT', getFunctionName(), 'ERROR' )

    return orders
}
