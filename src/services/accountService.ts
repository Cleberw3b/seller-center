//
//      Account Service
//

import { Account, Address, BankInfo, Contact, PersonalInfo, ShopInfo } from "../models/account"
import { createOrUpdateAddress, createOrUpdateBankInfo, createOrUpdatePersonalInfo, createOrUpdateShopInfo, createOrUpdateContact, findAddressByUserID, findBankInfoByUserID, findContactByUserID, findPersonalInfoByUserID, findShopInfoByID, findShopInfoByUserID } from "../repositories/accountRepository"
import { log } from "../utils/loggerUtil"
import { formatDate, getFunctionName, parseDate } from "../utils/util"
import { createTenant } from '../services/hub2bTenantService'

/**
 * Creates new Personal Information
 *
 * @param personalInfo -
 */
export const createPersonalInfo = async ( body: any ): Promise<PersonalInfo | null> => {

    let personalInfo

    const { userId, firstName, lastName, cpf, birthday, name, cnpj, razaoSocial, inscricaoEstadual, inscricaoMunicipal } = body

    if ( body.isPJ )
        personalInfo = { userId, name, cnpj, razaoSocial, inscricaoEstadual, inscricaoMunicipal }

    else if ( body.isPF ) {
        let _birthday: any

        if ( birthday ) {

            _birthday = parseDate( birthday )

            _birthday = formatDate( _birthday.getTime() )
        }
        personalInfo = { userId, firstName, lastName, cpf, birthday: _birthday }

    } else return null

    const newPersonalInfo = await createOrUpdatePersonalInfo( personalInfo )

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

    const newAddress = await createOrUpdateAddress( _address_ )

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

    const { name, userId } = body

    const shopInfo: ShopInfo = { name, userId }

    const newShopInfo = await createOrUpdateShopInfo( shopInfo )

    if (newShopInfo) {
        log( `Shop Info for ${ userId } added.`, 'EVENT', getFunctionName() )

        // Criação do Tenant após criação do shop
        /* await createTenant( {
            name: newShopInfo.name,
            website: "",
            documentNumber: "",
            companyName: "",
            ownerName: "",
            ownerEmail: "",
            ownerPhoneNumber: "",
            stateInscription: "",
            address: {
                zipCode: "",
                street: "",
                neighborhood: "",
                number: 0,
                city: "",
                state: "",
                country: ""
            }
        })*/
    } else {
        log( `Could not set shop information for ${ userId }`, 'EVENT', getFunctionName() )
    }

    return newShopInfo
}

/**
 * Creates new BankInfo
 *
 * @param bankInfo -
 */
export const createBankInfo = async ( body: any ): Promise<BankInfo | null> => {

    const { userId, bank, name, account, agency, pix } = body

    const bankInfo: BankInfo = { userId, bank, name, account, agency, pix }

    const newBankInfo = await createOrUpdateBankInfo( bankInfo )

    newBankInfo
        ? log( `Bank information for ${ userId } added.`, 'EVENT', getFunctionName() )
        : log( `Could not set bank information for ${ userId }`, 'EVENT', getFunctionName() )

    return newBankInfo
}

/**
 * Creates new Contact
 *
 * @param contact -
 */
export const createContact = async ( body: any ): Promise<Contact | null> => {

    const { userId, phone, whatsapp, url } = body

    const contact: Contact = { userId, phone, whatsapp, url }

    const newContact = await createOrUpdateContact( contact )

    newContact
        ? log( `Contact for ${ newContact.userId } added.`, 'EVENT', getFunctionName() )
        : log( `Could not set contact for ${ userId }`, 'EVENT', getFunctionName() )

    return newContact

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

    const contactPromise = findContactByUserID( userId )

    const [personalInfo, address, shopInfo, bankInfo, contact] = await Promise.all( [personalInfoPromise, addressPromise, shopInfoPromise, bankInfoPromise, contactPromise] )

    const account: Account = { bankInfo, address, personalInfo, shopInfo, contact }

    return account
}

/**
 * Get Shop by ID
 *
 * @param userId -
 */
export const findShop = async ( shopId: any ): Promise<ShopInfo | null> => {

    const shopInfo = await findShopInfoByID( shopId )

    return shopInfo
}
