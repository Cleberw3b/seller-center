//
//     Account Validation
//

import { findUserById } from "../repositories/userRepository"
import { findById } from "../services/userService"
import { AppError, invalidAccount, invalidAddress, invalidAddressNumber, invalidAgency, invalidBankCode, invalidBirthday, invalidCEP, invalidCity, invalidCNPJ, invalidComplement, invalidCPF, invalidDistrict, invalidFirstName, invalidLastName, invalidRG, invalidShopName, invalidUserReference } from "../utils/errors/errors"
import { isBankCodeValid, isCNPJValid, isCPFValid, isDateValid } from "../utils/util"

/**
 * Verifies whether the new personal information for an user can be created
 * 
 * @param email
 * @param password
 * @returns a list of `AppError` containing information in case of errors
 */
export const isNewPersonalInfoValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []


    if ( !body.userId || !await findById( body.userId ) ) errors.push( invalidUserReference )

    if ( !body.firstName || body.firstName.length < 2 ) errors.push( invalidFirstName )

    if ( !body.lastName || body.lastName.length < 2 ) errors.push( invalidLastName )

    if ( !body.cpf || !isCPFValid( body.cpf ) ) errors.push( invalidCPF )

    if ( !body.rg || body.rg.length < 4 ) errors.push( invalidRG )

    if ( !body.birthday || !isDateValid( body.birthday ) ) errors.push( invalidBirthday )

    return errors
}

/**
 * Verifies whether the new address information for an user can be created
 * 
 * @param email
 * @param password
 * @returns a list of `AppError` containing information in case of errors
 */
export const isNewAddressValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.userId || !await findUserById( body.userId ) ) errors.push( invalidUserReference )

    if ( !body.cep || body.cep.length != 9 ) errors.push( invalidCEP )

    if ( !body.address || body.address.length < 2 ) errors.push( invalidAddress )

    if ( !body.city || body.city.length < 2 ) errors.push( invalidCity )

    if ( body.complement && ( body.complement.length > 24 || body.complement.length < 4 ) ) errors.push( invalidComplement )

    if ( !body.district || body.district.length < 2 ) errors.push( invalidDistrict )

    if ( !body.number || body.number.length < 1 ) errors.push( invalidAddressNumber )

    return errors
}

/**
 * Verifies whether the new shop information for an user can be created
 * 
 * @param email
 * @param password
 * @returns a list of `AppError` containing information in case of errors
 */
export const isNewShopInfoValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.userId || !await findUserById( body.userId ) ) errors.push( invalidUserReference )

    if ( !body.cnpj || body.cnpj.length < 14 || !isCNPJValid( body.cnpj ) ) errors.push( invalidCNPJ )

    if ( !body.name || body.name.length < 2 ) errors.push( invalidShopName )

    return errors
}

/**
 * Verifies whether the new bank information for an user can be created
 * 
 * @param email
 * @param password
 * @returns a list of `AppError` containing information in case of errors
 */
export const isNewBankInfoValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.userId || !await findUserById( body.userId ) ) errors.push( invalidUserReference )

    if ( !body.bank || !isBankCodeValid( body.bank ) ) errors.push( invalidBankCode )

    if ( !body.account || body.account.length < 2 ) errors.push( invalidAccount )

    if ( !body.agency || body.agency.length < 2 ) errors.push( invalidAgency )

    return errors
}
