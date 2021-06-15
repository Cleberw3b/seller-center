//
//      Account Repository
//

import { ObjectID } from "bson"
import { MongoError } from "mongodb"
import { PersonalInfo, Address, BankInfo, ShopInfo } from "../models/account"
import { addressCollection, bankInfoCollection, personalInfoColletion, shopInfoCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

// #####################  PersonalInfo  ############################ //


/**
 * Save new personal info
 * 
 * @param personalInfo - the user personal information
 */
export const createNewPersonalInfo = async ( personalInfo: PersonalInfo ): Promise<PersonalInfo | null> => {
    try {
        const result = await personalInfoColletion.updateOne(
            { userId: personalInfo.userId },
            { $set: personalInfo },
            { upsert: true }
        )

        let id: ObjectID | null = null

        if ( result.upsertedCount )
            id = result.upsertedId._id

        if ( result.matchedCount )
            return await findPersonalInfoByUserID( personalInfo.userId )

        if ( !id ) throw new MongoError( "Não gerou id" )

        personalInfo._id = id

        return personalInfo

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Account Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find personal info by user id
 * 
 * @param userId
 */
export const findPersonalInfoByUserID = async ( userId: string ): Promise<PersonalInfo | null> => {
    try {

        const projection = { firstName: 1, lastName: 1, cpf: 1, rg: 1, birthday: 1 }

        const personalInfo = await personalInfoColletion.findOne( { userId }, { projection } )

        return personalInfo

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Account Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}



// #####################  Address  ############################ //


/**
 * Save new address 
 * 
 * @param address - the user address
 */
export const createNewAddress = async ( address: Address ): Promise<Address | null> => {
    try {
        const result = await addressCollection.updateOne(
            { userId: address.userId },
            { $set: address },
            { upsert: true }
        )

        let id: ObjectID | null = null

        if ( result.upsertedCount )
            id = result.upsertedId._id

        if ( result.matchedCount )
            return await findAddressByUserID( address.userId )

        if ( !id ) throw new MongoError( "Não gerou id" )

        address._id = id

        return address

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Account Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find address by user id
 * 
 * @param userId
 */
export const findAddressByUserID = async ( userId: string ): Promise<Address | null> => {
    try {

        const projection = { cep: 1, address: 1, number: 1, complement: 1, district: 1, city: 1 }

        const address = await addressCollection.findOne( { userId }, { projection } )

        return address

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Account Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}




// ###################  BankInfo  ############################## //


/**
 * Save new bank information
 * 
 * @param bankInfo - the user bank information
 */
export const createNewBankInfo = async ( bankInfo: BankInfo ): Promise<BankInfo | null> => {
    try {
        const result = await bankInfoCollection.updateOne(
            { userId: bankInfo.userId },
            { $set: bankInfo },
            { upsert: true }
        )

        let id: ObjectID | null = null

        if ( result.upsertedCount )
            id = result.upsertedId._id

        if ( result.matchedCount )
            return await findBankInfoByUserID( bankInfo.userId )

        if ( !id ) throw new MongoError( "Não gerou id" )

        bankInfo._id = id

        return bankInfo

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Account Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find bank information by user id
 * 
 * @param userId
 */
export const findBankInfoByUserID = async ( userId: string ): Promise<BankInfo | null> => {
    try {

        const projection = { account: 1, agency: 1, bank: 1 }

        const bankInfo = await bankInfoCollection.findOne( { userId }, { projection } )

        return bankInfo

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Account Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}



// #####################  ShopInfo  ############################ //


/**
 * Save new shop information
 * 
 * @param shopInfo - the user shop information
 */
export const createNewShopInfo = async ( shopInfo: ShopInfo ): Promise<ShopInfo | null> => {
    try {
        const result = await shopInfoCollection.updateOne(
            { userId: shopInfo.userId },
            { $set: shopInfo },
            { upsert: true }
        )

        let id: ObjectID | null = null

        if ( result.upsertedCount )
            id = result.upsertedId._id

        if ( result.matchedCount )
            return await findShopInfoByUserID( shopInfo.userId )

        if ( !id ) throw new MongoError( "Não gerou id" )

        shopInfo._id = id

        return shopInfo

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Account Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find shop information by user id
 * 
 * @param userId
 */
export const findShopInfoByUserID = async ( userId: string ): Promise<ShopInfo | null> => {
    try {

        const projection = { cnpj: 1, name: 1 }

        const shopInfo = await shopInfoCollection.findOne( { userId }, { projection } )

        return shopInfo

    } catch ( error ) {
        if ( error instanceof MongoError )
            log( error.message, 'EVENT', `Account Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}
