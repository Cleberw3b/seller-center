import { Collection, Db } from 'mongodb'
import { User } from '../../models/user'
import { ActivationToken } from '../../models/token'
import { Address, BankInfo, Contact, PersonalInfo, ShopInfo } from '../../models/account'

const USER_COLLECTION = 'user'
const ACTIVATION_TOKEN_COLLECTION = 'activation_token'
const PERSONAL_INFO_COLLECTION = 'personal_info'
const ADDRESS_COLLECTION = 'address'
const CONTACT_COLLECTION = 'contact'
const SHOP_INFO_COLLECTION = 'shop_info'
const BANK_INFO_COLLECTION = 'bank_info'

let userCollection: Collection<User>
let activationTokenCollection: Collection<ActivationToken>
let personalInfoColletion: Collection<PersonalInfo>
let addressCollection: Collection<Address>
let contactCollection: Collection<Contact>
let shopInfoCollection: Collection<ShopInfo>
let bankInfoCollection: Collection<BankInfo>

export const createCollections = ( database: Db ) => {

    userCollection = database.collection<User>( USER_COLLECTION )
    activationTokenCollection = database.collection<ActivationToken>( ACTIVATION_TOKEN_COLLECTION )
    personalInfoColletion = database.collection<PersonalInfo>( PERSONAL_INFO_COLLECTION )
    addressCollection = database.collection<Address>( ADDRESS_COLLECTION )
    contactCollection = database.collection<Contact>( CONTACT_COLLECTION )
    shopInfoCollection = database.collection<ShopInfo>( SHOP_INFO_COLLECTION )
    bankInfoCollection = database.collection<BankInfo>( BANK_INFO_COLLECTION )

}

export {
    userCollection,
    activationTokenCollection,
    personalInfoColletion,
    addressCollection,
    contactCollection,
    shopInfoCollection,
    bankInfoCollection,
}
