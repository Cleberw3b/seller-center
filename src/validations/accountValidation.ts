//
//     Account Validation
//

import { findUserById } from "../repositories/userRepository"
import { AppError, invalidAccount, invalidAddress, invalidAddressNumber, invalidAgency, invalidBankCode, invalidBirthday, invalidCEP, invalidCity, invalidCNPJ, invalidComplement, invalidCPF, invalidDistrict, invalidFirstName, invalidLastName, invalidUserReference } from "../utils/errors/errors"
import { isBankCodeValid, isCNPJValid, isCPFValid, isDateValid } from "../utils/util"

/**
 * Verifies whether the Personal Information for an user is valid
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isPersonalInfoValid = async ( body: any ): Promise<AppError[]> => {

    if ( !body.isPF && !body.isPJ ) return [invalidUserReference]

    if ( body.isPF ) return isPFValid( body )

    else if ( body.isPJ ) return isPJValid( body )

    return []

}

/**
 * Verifies whether the Pessoa Física information for an user is valid
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isPFValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.firstName || body.firstName.length < 2 ) errors.push( invalidFirstName )

    if ( !body.lastName || body.lastName.length < 2 ) errors.push( invalidLastName )

    if ( !body.cpf || !isCPFValid( body.cpf ) ) errors.push( invalidCPF )

    if ( !body.birthday || !isDateValid( body.birthday ) ) errors.push( invalidBirthday )

    return errors
}

/**
 * Verifies whether the Pessoa Jurídica information for an user is valid
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isPJValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.cnpj || !isCNPJValid( body.cnpj ) ) errors.push( invalidCNPJ )

    if ( !body.name || body.name.length < 2 ) errors.push()

    if ( !body.razaoSocial || body.name.length < 2 ) errors.push()

    if ( body.inscricaoEstadual && body.name.length < 2 ) errors.push()

    if ( body.inscricaoMunicipal && body.name.length < 2 ) errors.push()

    return errors
}

/**
 * Verifies whether the address information for an user is valid
 * 
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isAddressValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.cep || body.cep.length != 9 ) errors.push( invalidCEP )

    if ( !body.address || body.address.length < 2 ) errors.push( invalidAddress )

    if ( !body.city || body.city.length < 2 ) errors.push( invalidCity )

    if ( body.complement && ( body.complement.length > 24 || body.complement.length < 4 ) ) errors.push( invalidComplement )

    if ( !body.district || body.district.length < 2 ) errors.push( invalidDistrict )

    if ( !body.number || body.number.length < 1 ) errors.push( invalidAddressNumber )

    return errors
}

/**
 * Verifies whether the shop information for an user can be created
 * 
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isShopInfoValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.userId || !await findUserById( body.userId ) ) errors.push( invalidUserReference )

    return errors
}

/**
 * Verifies whether the bank information for an user is valid
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isBankInfoValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.bank || !isBankCodeValid( body.bank ) ) errors.push( invalidBankCode )

    if ( !body.account || body.account.length < 2 ) errors.push( invalidAccount )

    if ( !body.agency || body.agency.length < 2 ) errors.push( invalidAgency )

    return errors
}

/**
 * Verifies whether the contact information for an user is valid
 *
 * @param body
 * @returns a list of `AppError` containing description of errors
 */
export const isContactValid = async ( body: any ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !body.telephone || body.telephone.length < 2 ) errors.push()

    return errors
}
