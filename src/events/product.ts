//
//      Product Event Manager
//

import events from 'events'
import { Product } from '../models/product'
import { criarProdutoHub2b, deleteProdutoHub2b, parseProdutoToProdutoHub2, updatePriceHub2b, updateProdutoHub2b, updateStockHub2b } from '../services/hub2b'

const productEventEmitter = new events.EventEmitter()

productEventEmitter.on( 'create', ( product: Product ) => {

    console.log( `ProductEventEmitter` )
    console.log( `Criando produto ${ product._id } na hub2b.` )

    criarProdutoHub2b( parseProdutoToProdutoHub2( product ) )
} )

productEventEmitter.on( 'update', ( product: Product ) => {

    console.log( `ProductEventEmitter` )
    console.log( `Updating produto ${ product._id } na hub2b.` )

    updateProdutoHub2b( parseProdutoToProdutoHub2( product ) )

} )

productEventEmitter.on( 'delete', ( product: Product ) => {

    console.log( `ProductEventEmitter` )
    console.log( `Deletando produto ${ product._id } na hub2b.` )

    deleteProdutoHub2b( product._id )

} )

productEventEmitter.on( 'update_stock', ( product: Product ) => {

    console.log( `ProductEventEmitter` )
    console.log( `Updating stock produto ${ product._id } na hub2b.` )

    product.variations && Array.isArray( product.variations ) && product.variations.forEach( variation => {
        updateStockHub2b( variation._id, variation.stock )
    } )

} )


productEventEmitter.on( 'update_price', ( product: Product ) => {

    console.log( `ProductEventEmitter` )
    console.log( `Updating price do produto ${ product._id } na hub2b.` )

    product.variations && Array.isArray( product.variations ) && product.variations.forEach( variation => {
        updatePriceHub2b( variation._id, product.price, product.price_discounted )
    } )

} )

export default productEventEmitter
