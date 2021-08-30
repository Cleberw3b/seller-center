//
//      Order Repository
//

import { MongoError, ObjectID } from "mongodb"
import { Order, OrderIntegration } from "../models/order"
import { orderCollection, orderIntegrationCollection, userCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save a new hub2b integration 
 * 
 * @param orderIntegration -orderIntegration
 */
export const newIntegrationHub2b = async ( orderIntegration: OrderIntegration ): Promise<boolean> => {

    try {

        const result = await orderIntegrationCollection.insertOne( orderIntegration )

        return result.ops[0] ? true : false

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Order Repository - ${ getFunctionName() }`, 'ERROR' )

        return false
    }
}

/**
 * Find last hub2b integration
 * 
 */
export const findLastIntegrationOrder = async (): Promise<OrderIntegration | null> => {

    try {

        const result = await orderIntegrationCollection.findOne( { $query: {}, $orderby: { $natural: -1 } } )

        return result

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Order Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Save orders 
 * 
 * @param user - new user
 */
export const newOrderHub2b = async ( orderIntegration: Order ): Promise<Order | null> => {

    try {

        const result = await orderCollection.insertOne( orderIntegration )

        return result.ops[0] ? result.ops[0] : null

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `Order Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}