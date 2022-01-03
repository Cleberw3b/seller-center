//
//      Order Event Manager
//

import events from 'events'
import { postInvoiceHub2b, updateStatusHub2b } from '../services/hub2bService'
import { sendTracking, updateStatus } from '../services/orderService'

const orderEventEmitter = new events.EventEmitter()

orderEventEmitter.on('updated', (orderId,status) => console.log(`Atualizando status do pedido ${orderId} para ${status}`))

// Notify Seller by email.
orderEventEmitter.on( 'approved', ( orderId ) => console.log( `Order ${orderId} is now approved.` ) )

orderEventEmitter.on( 'invoiced', ( orderId, invoice ) => postInvoiceHub2b(orderId, invoice ) )

orderEventEmitter.on( 'shipped', ( orderId, tracking ) => sendTracking(orderId, tracking ) )

orderEventEmitter.on('delivered', (orderId, status) => updateStatusHub2b(orderId, status) )

export default orderEventEmitter
