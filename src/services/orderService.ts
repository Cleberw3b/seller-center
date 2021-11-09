//
//      Token Service
//

import { HUB2B_Order } from "../models/hub2b"
import { Order, OrderIntegration } from "../models/order"
import { findLastIntegrationOrder, findOrderByShopId, newIntegrationHub2b, newOrderHub2b } from "../repositories/orderRepository"
import { log } from "../utils/loggerUtil"
import { getFunctionName, nowIsoDateHub2b } from "../utils/util"
import { getSKU, listAllOrdersHub2b, listOrdersHub2bByTime } from "./hub2bService"
import { findProductByVariation } from "./productService"

export const INTEGRATION_INTERVAL = 1000 * 13 //seconds

const saveIntegration = ( orderIntegration: OrderIntegration, ordersList: [] ) => {

    saveOrders( ordersList )

    newIntegrationHub2b( orderIntegration )
}

export const integrateHub2bOrders = async ( start?: string, end?: string ) => {

    let ordersList

    let lastOrderIntegration: OrderIntegration | null = null

    if ( start && end ) {

        ordersList = await listOrdersHub2bByTime( start, end )

        lastOrderIntegration = {
            lastUpdate: end,
            updateFrom: start,
            updateTo: end,
        }

        return saveIntegration( lastOrderIntegration, ordersList )
    }

    lastOrderIntegration = await findLastIntegrationOrder()

    const now = nowIsoDateHub2b()

    if ( lastOrderIntegration ) {

        ordersList = await listOrdersHub2bByTime( lastOrderIntegration.lastUpdate, now )

        if ( !ordersList || ordersList.length === 0 ) return

        lastOrderIntegration = {
            lastUpdate: now,
            updateFrom: lastOrderIntegration.lastUpdate,
            updateTo: now,
        }

    } else {

        ordersList = await listAllOrdersHub2b()

        if ( !ordersList || ordersList.length === 0 ) return

        const firstDate = ordersList[0].createdDate

        const lastDate = ordersList[ordersList.length - 1].createdDate

        lastOrderIntegration = {
            lastUpdate: lastDate,
            updateFrom: firstDate,
            updateTo: lastDate
        }

    }

    return saveIntegration( lastOrderIntegration, ordersList )
}

/**
 * List all orders from a shop
 * 
 * @param shop_id Shop ID
 */
export const findOrdersByShop = async ( shop_id: any ): Promise<Order[] | null> => {

    const orders = await findOrderByShopId( shop_id )

    orders
        ? log( `Listing orders from ` + shop_id, 'EVENT', getFunctionName() )
        : log( `Could not retrieve orders.`, 'EVENT', getFunctionName() )

    return orders
}

/**
 * Save a list of orders
 * 
 * @param shop_id Shop ID
 */
export const saveOrders = async ( orderList: HUB2B_Order[] ) => {

    for ( let i = 0; i < orderList.length; i++ ) {

        const orderHub2 = orderList[i]

        const product = await findProductByVariation( orderHub2.products[0].sku )

        if ( !product ) break

        const order = await newOrderHub2b( { order: orderHub2, shop_id: product.shop_id } )

        order
            ? log( `Order with sku`, 'EVENT', getFunctionName() )
            : log( `Could not retrieve category list.`, 'EVENT', getFunctionName(), 'ERROR' )
    }
}
