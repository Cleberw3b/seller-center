//
//      Order Repository
//

import { MongoError, ObjectID } from "mongodb"
import { Order, OrderIntegration } from "../models/order"
import { orderCollection, orderIntegrationCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save a new hub2b integration
 *
 * @param orderIntegration -orderIntegration
 */
export const newIntegrationHub2b = async (orderIntegration: OrderIntegration): Promise<boolean> => {

    try {

        const result = await orderIntegrationCollection.insertOne(orderIntegration)

        return result.ops[0] ? true : false

    } catch (error) {

        if (error instanceof MongoError || error instanceof Error)
            log(error.message, 'EVENT', `Order Repository - ${getFunctionName()}`, 'ERROR')

        return false
    }
}

/**
 * Find last hub2b integration
 *
 */
export const findLastIntegrationOrder = async (): Promise<OrderIntegration | null> => {

    try {

        const result = await orderIntegrationCollection.find({}).sort({ _id: -1 }).limit(1).toArray();

        return result ? result[0] : null

    } catch (error) {

        if (error instanceof MongoError || error instanceof Error)
            log(error.message, 'EVENT', `Order Repository - ${getFunctionName()}`, 'ERROR')

        return null
    }
}

/**
 * Save orders
 *
 * @param user - new user
 */
export const newOrderHub2b = async (orderIntegration: Order): Promise<Order | null> => {

    try {

        const result = await orderCollection.insertOne(orderIntegration)

        return result.ops[0] ? result.ops[0] : null

    } catch (error) {

        if (error instanceof MongoError || error instanceof Error)
            log(error.message, 'EVENT', `Order Repository - ${getFunctionName()}`, 'ERROR')

        return null
    }
}

/**
 * Find orders by shop_id
 *
 * @param _id
 */
export const findOrderByShopId = async (shop_id: string): Promise<Order[] | null> => {

    try {

        const result = await orderCollection.find({ shop_id: shop_id })

        const orders = await result.toArray()

        return orders

    } catch (error) {

        if (error instanceof MongoError || error instanceof Error)
            log(error.message, 'EVENT', `User Repository - ${getFunctionName()}`, 'ERROR')

        return null
    }
}

export const findOneOrderAndModify = async (where: any, by: any, fields: {}): Promise<{}|null> => {

    try {

        const filter = { [where]: Number(by) }

        const result = await orderCollection.findOneAndUpdate(filter, {$set: fields})

        if (result.value) log(`Order status updated`, 'EVENT', `Order Repository - ${getFunctionName()}`, 'INFO')

        return result

    } catch (error) {

        if (error instanceof MongoError || error instanceof Error)
            log(error.message, 'EVENT', `User Repository - ${getFunctionName()}`, 'ERROR')

        return null
    }
}
