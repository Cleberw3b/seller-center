//
//      Product Event Manager
//

import events from 'events'
import { Product } from '../models/product'
import { criarProdutoHub2b, parseProdutoToProdutoHub2, updateProdutoHub2b } from '../services/hub2b'

const productEventEmitter = new events.EventEmitter()

productEventEmitter.on( 'create', ( product: Product ) => {

    console.log( `ProductEventEmitter` )
    console.log( `Criando produto ${ product._id } na hub2b.` )

    criarProdutoHub2b( parseProdutoToProdutoHub2( product ) )
} )

productEventEmitter.on( 'update', ( product: Product ) => {

    console.log( `ProductEventEmitter` )
    console.log( `Update produto ${ product._id } na hub2b.` )

    updateProdutoHub2b( parseProdutoToProdutoHub2( product ) )
} )

export default productEventEmitter
