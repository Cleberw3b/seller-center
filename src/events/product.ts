//
//      Product Event Manager
//

import events from 'events'
import { Product } from '../models/product'
import { criarProdutoHub2b, deleteProdutoHub2b, parseProdutoToProdutoHub2, updatePriceHub2b, updateProdutoHub2b, updateStockHub2b } from '../services/hub2bService'
import { log } from '../utils/loggerUtil'

const productEventEmitter = new events.EventEmitter()

productEventEmitter.on( 'create', ( product: Product, idTenant: any ) => {

    log( `Criando produto ${ product._id } na hub2b.`, 'EVENT', 'ProductEventEmitter' )

    criarProdutoHub2b( parseProdutoToProdutoHub2( product ), idTenant )
} )

productEventEmitter.on( 'update', ( product: Product, idTenant: any ) => {

    log( `Updating produto ${ product._id } na hub2b.`, 'EVENT', 'ProductEventEmitter' )

    updateProdutoHub2b( parseProdutoToProdutoHub2( product ), idTenant )

} )

productEventEmitter.on( 'delete', ( product: Product, idTenant: any ) => {

    log( `Deletando produto ${ product._id } na hub2b.`, 'EVENT', 'ProductEventEmitter' )

    deleteProdutoHub2b( product._id, idTenant )

} )

productEventEmitter.on( 'update_stock', ( product: Product ) => {

    log( `Updating stock produto ${ product._id } na hub2b.`, 'EVENT', 'ProductEventEmitter' )

    product.variations && Array.isArray( product.variations ) && product.variations.forEach( variation => {
        updateStockHub2b( variation._id, variation.stock )
    } )

} )

productEventEmitter.on( 'update_price', ( product: Product ) => {

    log( `Updating price produto ${ product._id } na hub2b.`, 'EVENT', 'ProductEventEmitter' )

    product.variations && Array.isArray( product.variations ) && product.variations.forEach( variation => {
        updatePriceHub2b( variation._id, product.price, product.price_discounted )
    } )

} )

export default productEventEmitter
