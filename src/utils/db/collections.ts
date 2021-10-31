import { Collection, Db } from 'mongodb'
import { User } from '../../models/user'
import { AccessToken } from '../../models/token'
import { Address, BankInfo, Contact, PersonalInfo, ShopInfo } from '../../models/account'
import { Product, Variation } from '../../models/product'
import { Order, OrderIntegration } from '../../models/order'
import { HUB2B_Credentials } from '../../models/hub2b'

export const USER_COLLECTION = 'user'
export const ACTIVATION_TOKEN_COLLECTION = 'activation_token'
export const PERSONAL_INFO_COLLECTION = 'personal_info'
export const ADDRESS_COLLECTION = 'address'
export const CONTACT_COLLECTION = 'contact'
export const SHOP_INFO_COLLECTION = 'shop_info'
export const BANK_INFO_COLLECTION = 'bank_info'
export const PRODUCT_COLLECTION = 'product'
export const VARIATION_COLLECTION = 'variation'
export const ORDER_COLLECTION = 'order'
export const ORDER_INTEGRATION_COLLECTION = 'order_integration'
export const HUB2B_AUTH_COLLECTION = 'hub2b_auth'

let userCollection: Collection<User>
let accessTokenCollection: Collection<AccessToken>
let personalInfoCollection: Collection<PersonalInfo>
let addressCollection: Collection<Address>
let contactCollection: Collection<Contact>
let shopInfoCollection: Collection<ShopInfo>
let bankInfoCollection: Collection<BankInfo>
let productCollection: Collection<Product>
let variationCollection: Collection<Variation>
let orderCollection: Collection<Order>
let orderIntegrationCollection: Collection<OrderIntegration>
let hub2bAuthCollection: Collection<HUB2B_Credentials>

export const createCollections = async ( database: Db ) => {

    userCollection = database.collection<User>( USER_COLLECTION )
    accessTokenCollection = database.collection<AccessToken>( ACTIVATION_TOKEN_COLLECTION )
    personalInfoCollection = database.collection<PersonalInfo>( PERSONAL_INFO_COLLECTION )
    addressCollection = database.collection<Address>( ADDRESS_COLLECTION )
    contactCollection = database.collection<Contact>( CONTACT_COLLECTION )
    shopInfoCollection = database.collection<ShopInfo>( SHOP_INFO_COLLECTION )
    bankInfoCollection = database.collection<BankInfo>( BANK_INFO_COLLECTION )
    productCollection = database.collection<Product>( PRODUCT_COLLECTION )
    variationCollection = database.collection<Variation>( VARIATION_COLLECTION )
    orderCollection = database.collection<Order>( ORDER_COLLECTION )
    orderIntegrationCollection = database.collection<OrderIntegration>( ORDER_INTEGRATION_COLLECTION )
    hub2bAuthCollection = database.collection<HUB2B_Credentials>( HUB2B_AUTH_COLLECTION )

    await startIndexes()
}

const startIndexes = () => {
    userCollection.createIndex( { "email": 1 }, { unique: true } )
}

export {
    userCollection,
    accessTokenCollection,
    personalInfoCollection,
    addressCollection,
    contactCollection,
    shopInfoCollection,
    bankInfoCollection,
    productCollection,
    variationCollection,
    orderCollection,
    orderIntegrationCollection,
    hub2bAuthCollection,
}
