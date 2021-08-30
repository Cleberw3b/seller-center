//
//      Token Service
//

import { HUB2B_Order } from "../models/hub2b"
import { OrderIntegration } from "../models/order"
import { findLastIntegrationOrder, newIntegrationHub2b, newOrderHub2b } from "../repositories/orderRepository"
import { log } from "../utils/loggerUtil"
import { formatDateEnglish, getFunctionName } from "../utils/util"
import { getSKU, listAllOrdersHub2b, listOrdersHub2bByTime } from "./hub2b"
import { findProductByVariation } from "./productService"

export const INTEGRATION_INTERVAL = 1000 * 13 //seconds

export const integrateHub2bOrders = async () => {

    const offSet = 2000

    const now = formatDateEnglish( Date.now() )

    const orderIntegration: OrderIntegration = {
        lastUpdate: now,
        updateFrom: now,
        updateTo: now
    }

    let ordersList

    let lastOrderIntegration = await findLastIntegrationOrder()

    if ( !lastOrderIntegration || !lastOrderIntegration.lastUpdate ) {

        ordersList = await listAllOrdersHub2b()

        orderIntegration.updateFrom = '0'
    } else {
        ordersList = await listOrdersHub2bByTime( lastOrderIntegration.lastUpdate, now )

        orderIntegration.updateFrom = lastOrderIntegration.lastUpdate
    }

    if ( !ordersList ) return

    saveOrders( ordersList )

    newIntegrationHub2b( orderIntegration )
}

/**
 * List all orders from a shop
 * 
 * @param shop_id Shop ID
 */
export const findOrdersByShop = async ( shop_id: any ): Promise<HUB2B_Order[] | null> => {

    const orders = null

    orders
        ? log( `Listing categories`, 'EVENT', getFunctionName() )
        : log( `Could not retrieve category list.`, 'EVENT', getFunctionName(), 'ERROR' )

    return orders
}

/**
 * Save a list of orders
 * 
 * @param shop_id Shop ID
 */
export const saveOrders = async ( orderList: HUB2B_Order[] ) => {

    for ( let i = 0; i < orderList.length; i++ ) {

        const order = orderList[i]

        const hub2bProductId = order.products[0].idProduct

        const sku = await getSKU( order.products[0].sku )

        const product = await findProductByVariation( sku )

        if ( !product ) break

        const _order = await newOrderHub2b( { order, shop_id: product.shop_id } )

        _order
            ? log( `Order with sku`, 'EVENT', getFunctionName() )
            : log( `Could not retrieve category list.`, 'EVENT', getFunctionName(), 'ERROR' )
    }
}
