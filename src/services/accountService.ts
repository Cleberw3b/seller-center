//
//      Account Service
//

import { Account, Address, BankInfo, PersonalInfo, ShopInfo } from "../models/account"
import { createNewAddress, createNewBankInfo, createNewPersonalInfo, createNewShopInfo, findAddressByUserID, findBankInfoByUserID, findPersonalInfoByUserID, findShopInfoByID, findShopInfoByUserID } from "../repositories/accountRepository"
import { log } from "../utils/loggerUtil"
import { formatDate, getFunctionName, parseDate } from "../utils/util"

/**
 * Creates new Personal Information
 *
 * @param personalInfo -
 */
export const createPersonalInfo = async ( body: any ): Promise<PersonalInfo | null> => {

    const { userId, firstName, lastName, cpf, rg, birthday } = body

    let _birthday: any = parseDate( birthday )

    _birthday = formatDate( _birthday.getTime() )

    const personalInfo: PersonalInfo = { userId, firstName, lastName, cpf, rg, birthday: _birthday }

    const newPersonalInfo = await createNewPersonalInfo( personalInfo )

    newPersonalInfo
        ? log( `Personal information for ${ userId } added.`, 'EVENT', getFunctionName() )
        : log( `Could not set personal information for ${ userId }`, 'EVENT', getFunctionName() )

    return newPersonalInfo
}

/**
 * Creates new Address
 *
 * @param address -
 */
export const createAddress = async ( body: any ): Promise<Address | null> => {

    const { address, cep, city, complement, district, number, userId } = body

    const _address_: Address = { address, cep, city, complement, district, number, userId }

    const newAddress = await createNewAddress( _address_ )

    newAddress
        ? log( `Address for ${ userId } added.`, 'EVENT', getFunctionName() )
        : log( `Could not set address for ${ userId }`, 'EVENT', getFunctionName() )

    return newAddress

}

/**
 * Creates new shop information
 *
 * @param shopInfo -
 */
export const createShopInfo = async ( body: any ): Promise<ShopInfo | null> => {

    const { cnpj, name, userId } = body

    const shopInfo: ShopInfo = { cnpj, name, userId }

    const newShopInfo = await createNewShopInfo( shopInfo )

    newShopInfo
        ? log( `Shop Info for ${ userId } added.`, 'EVENT', getFunctionName() )
        : log( `Could not set shop information for ${ userId }`, 'EVENT', getFunctionName() )

    return newShopInfo
}

/**
 * Creates new BankInfo
 *
 * @param bankInfo -
 */
export const createBankInfo = async ( body: any ): Promise<BankInfo | null> => {

    const { bank, account, agency, userId } = body

    const bankInfo: BankInfo = { bank, account, agency, userId }

    const newBankInfo = await createNewBankInfo( bankInfo )

    newBankInfo
        ? log( `Bank information for ${ userId } added.`, 'EVENT', getFunctionName() )
        : log( `Could not set bank information for ${ userId }`, 'EVENT', getFunctionName() )

    return newBankInfo
}


/**
 * Get account by ID
 *
 * @param userId -
 */
export const getAccount = async ( userId: any ): Promise<Account | null> => {

    const personalInfoPromise = findPersonalInfoByUserID( userId )

    const addressPromise = findAddressByUserID( userId )

    const shopInfoPromise = findShopInfoByUserID( userId )

    const bankInfoPromise = findBankInfoByUserID( userId )

    const [personalInfo, address, shopInfo, bankInfo] = await Promise.all( [personalInfoPromise, addressPromise, shopInfoPromise, bankInfoPromise] )

    const account: Account = { bankInfo, address, personalInfo, shopInfo }

    return account
}


/**
 * Get account by ID
 *
 * @param userId -
 */
export const findShop = async ( shopId: any ): Promise<ShopInfo | null> => {

    const shopInfo = await findShopInfoByID( shopId )

    return shopInfo
}


// ###########


/**
 * Creates new Contact
 *
 * @param contact -
 */
// export const createContact = async ( body: any ): Promise<Contact | null> => {

//     const { telphone, whatsapp } = body

//     const contact: Contact = { telphone, whatsapp, }

// const newContact = await createNewContact( contact )

// newContact
//     ? log( `Address for ${ newContact.userId } added.`, 'EVENT', getFunctionName() )
//     : log( `Could not set address for ${ userId }`, 'EVENT', getFunctionName() )

// return newContact

// }
