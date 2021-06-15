//
//      Product Event Manager
//

import events from 'events'
import { Product } from '../models/product'

const productEventEmitter = new events.EventEmitter()

productEventEmitter.on( 'create', ( product: Product ) =>
    console.log( product )
)

productEventEmitter.on( 'update', ( product: Product ) =>
    console.log( product )
)

export default productEventEmitter
