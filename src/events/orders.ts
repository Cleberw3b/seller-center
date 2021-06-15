//
//      Order Event Manager
//

import events from 'events'
import { Product } from '../models/product'

const orderEventEmitter = new events.EventEmitter()

orderEventEmitter.on( 'purchase', ( product: Product ) =>
    console.log( product )
)

orderEventEmitter.on( 'update', ( product: Product ) =>
    console.log( product )
)

export default orderEventEmitter
