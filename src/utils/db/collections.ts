import { Collection, Db } from 'mongodb'
import { User } from '../../models/user'
import { ActivationToken } from '../../models/token'
import { Address, BankInfo, Contact, PersonalInfo, ShopInfo } from '../../models/account'
import { Product, Variation } from '../../models/product'

export const USER_COLLECTION = 'user'
export const ACTIVATION_TOKEN_COLLECTION = 'activation_token'
export const PERSONAL_INFO_COLLECTION = 'personal_info'
export const ADDRESS_COLLECTION = 'address'
export const CONTACT_COLLECTION = 'contact'
export const SHOP_INFO_COLLECTION = 'shop_info'
export const BANK_INFO_COLLECTION = 'bank_info'
export const PRODUCT_COLLECTION = 'product'
export const VARIATION_COLLECTION = 'variation'

let userCollection: Collection<User>
let activationTokenCollection: Collection<ActivationToken>
let personalInfoColletion: Collection<PersonalInfo>
let addressCollection: Collection<Address>
let contactCollection: Collection<Contact>
let shopInfoCollection: Collection<ShopInfo>
let bankInfoCollection: Collection<BankInfo>
let productCollection: Collection<Product>
let variationCollection: Collection<Variation>

export const createCollections = ( database: Db ) => {

    userCollection = database.collection<User>( USER_COLLECTION )
    activationTokenCollection = database.collection<ActivationToken>( ACTIVATION_TOKEN_COLLECTION )
    personalInfoColletion = database.collection<PersonalInfo>( PERSONAL_INFO_COLLECTION )
    addressCollection = database.collection<Address>( ADDRESS_COLLECTION )
    contactCollection = database.collection<Contact>( CONTACT_COLLECTION )
    shopInfoCollection = database.collection<ShopInfo>( SHOP_INFO_COLLECTION )
    bankInfoCollection = database.collection<BankInfo>( BANK_INFO_COLLECTION )
    productCollection = database.collection<Product>( PRODUCT_COLLECTION )
    variationCollection = database.collection<Variation>( VARIATION_COLLECTION )

}

export {
    userCollection,
    activationTokenCollection,
    personalInfoColletion,
    addressCollection,
    contactCollection,
    shopInfoCollection,
    bankInfoCollection,
    productCollection,
    variationCollection
}
