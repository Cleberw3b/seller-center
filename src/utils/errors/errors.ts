//
//     Errors
//

import { errorCode } from './errorCode'

/**
 * Define Interface AppError
 */
export interface AppError {
    errorCode: errorCode
    description: string
    tip: string
    example?: string[]
}

/**
 * NEVER USE
 */
export const voidError: AppError = {
    errorCode: 0x000,
    description: 'It should never happen, call a developer',
    tip: 'Miss developed',
    example: ['Do not use']
}

/**
 * ERROR - Login Fail
 */
export const loginFail: AppError = {
    errorCode: 0x001,
    description: 'The credential used is invalid',
    tip: 'Check your login and password',
    example: [
        `{ 
            \'login\': \'Your Login\',
            \'password\': \'Your Passwor\'
        }`
    ]
}

/**
 * ERROR - Invalid Email 
 */
export const invalidEmail: AppError = {
    errorCode: 0x002,
    description: 'The email is invalid.',
    tip: 'Check the field e-mail',
    example: [
        `example@mail.com`
    ]
}


/**
 * ERROR - Invalid Paswword 
 */
export const invalidPassword: AppError = {
    errorCode: 0x003,
    description: 'The password is invalid.',
    tip: 'Check the field password, it must be a strong password.',
    example: [
        `
        The password is at least 8 characters long.
        The password has at least one uppercase letter.
        The password has at least one lowercase letter.
        The password has at least one digit.
        The password has at least one special character.
         `
    ]
}

/**
 * ERROR - User already exists 
 */
export const userExists: AppError = {
    errorCode: 0x004,
    description: 'The user already exists.',
    tip: 'Try to login or recover your password',
    example: [``]
}


/**
 * ERROR - User does not exists 
 */
export const userNotExists: AppError = {
    errorCode: 0x005,
    description: 'The user does not exists.',
    tip: 'Check the email informed.',
    example: [``]
}

/**
 * ERROR - Invalid Activation Token
 */
export const invalidActivationToken: AppError = {
    errorCode: 0x006,
    description: 'The activation token is invalid',
    tip: 'Check your e-mail for the valid url registration',
    example: [``]
}

/**
 * Lista com todos os erros relacionados a Client
 */
export const errorsList: AppError[] = [
]


/**
 * Retorna um error object dependendo do código referenciado
 * 
 * @param errorCode 
 */
export const findError = ( errorCode: errorCode ) => {
    return errorsList.find( error => error.errorCode === errorCode ) || voidError
}
