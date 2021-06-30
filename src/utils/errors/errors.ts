//
//     Errors
//

import { PROJECT_HOST } from '../consts'
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
    description: 'It should never happen, call a developer.',
    tip: 'Miss developed.',
    example: ['Do not use.']
}

/**
 * ERROR - Login Fail
 */
export const loginFail: AppError = {
    errorCode: 0x001,
    description: 'Credentials invalid.',
    tip: 'Check your login and password.',
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
    description: 'Email invalid.',
    tip: 'Check the field e-mail.',
    example: [
        `example@mail.com`
    ]
}

/**
 * ERROR - Invalid Paswword 
 */
export const invalidPassword: AppError = {
    errorCode: 0x003,
    description: 'Password invalid.',
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
    description: 'User already exists.',
    tip: 'Try to login or recover your password.',
    example: [``]
}

/**
 * ERROR - User does not exists 
 */
export const userNotExists: AppError = {
    errorCode: 0x005,
    description: 'User does not exists.',
    tip: 'Check the email informed.',
    example: [``]
}

/**
 * ERROR - Invalid Token
 */
export const invalidToken: AppError = {
    errorCode: 0x006,
    description: 'Token invalid.',
    tip: 'Check your e-mail for the valid url.',
    example: [``]
}

/**
 * ERROR - Invalid User Reference
 */
export const invalidUserReference: AppError = {
    errorCode: 0x007,
    description: 'User id invalid.',
    tip: 'The user passed as reference is invalid. Check your reference ID to submit a request.',
    example: [``]
}

/**
 * ERROR - Invalid user type registration
 */
export const invalidUserTypeRegistration: AppError = {
    errorCode: 0x008,
    description: 'User type invalid.',
    tip: 'The user has no reference for PJ or PF',
    example: [
        `{ 
            \'isPF\': \'true\'
        },
        {
            \'isPJ\': \'true\'
        }`
    ]
}

/**
 * ERROR - Invalid First Name
 */
export const invalidFirstName: AppError = {
    errorCode: 0x009,
    description: 'First name invalid.',
    tip: 'Check first name field.',
    example: [`
        The first name is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid Last Name
 */
export const invalidLastName: AppError = {
    errorCode: 0x00A,
    description: 'Last name invalid.',
    tip: 'Check last name field.',
    example: [`
        The last name is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid CPF
 */
export const invalidCPF: AppError = {
    errorCode: 0x00B,
    description: 'CPF invalid.',
    tip: 'Check cpf field.',
    example: [`
        You must have a valid CPF to register.
    `]
}

/**
 * ERROR - Invalid Birthday
 */
export const invalidBirthday: AppError = {
    errorCode: 0x00C,
    description: 'Birthday invalid.',
    tip: 'Check birthday field.',
    example: [`
        01/01/1970
    `]
}

/**
 * ERROR - Invalid CEP
 */
export const invalidCEP: AppError = {
    errorCode: 0x00D,
    description: 'CEP invalid.',
    tip: 'Check cep field.',
    example: [`
        The cep is 7 characters long.
    `]
}

/**
 * ERROR - Invalid Address
 */
export const invalidAddress: AppError = {
    errorCode: 0x00E,
    description: 'Address invalid.',
    tip: 'Check address field.',
    example: [`
        The address is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid City
 */
export const invalidCity: AppError = {
    errorCode: 0x00F,
    description: 'City invalid.',
    tip: 'Check city field.',
    example: [`
        The city is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid Complement
 */
export const invalidComplement: AppError = {
    errorCode: 0x010,
    description: 'Complement invalid.',
    tip: 'Check complement field.',
    example: [`
        The complement is at least 4 characters long.
        The complement is at maximum 24 characters long.
    `]
}

/**
 * ERROR - Invalid District
 */
export const invalidDistrict: AppError = {
    errorCode: 0x011,
    description: 'District is invalid.',
    tip: 'Check district field.',
    example: [`
        The district is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid Address Number
 */
export const invalidAddressNumber: AppError = {
    errorCode: 0x012,
    description: 'Address number is invalid.',
    tip: 'Check address number field.',
    example: [`
        The address Number is at least 1 character long.
    `]
}

/**
 * ERROR - Invalid CNPJ
 */
export const invalidCNPJ: AppError = {
    errorCode: 0x013,
    description: 'CNPJ is invalid.',
    tip: 'Check cnpj field.',
    example: [`
        You must have a valid CNPJ to register.
        The cnpj is at least 14 characters long.
    `]
}

/**
 * ERROR - Invalid company name
 */
export const invalidCompanyName: AppError = {
    errorCode: 0x014,
    description: 'Company name is invalid.',
    tip: 'Check company name field.',
    example: [`
          The company name is at least 3 character long.
    `]
}

/**
 * ERROR - Invalid razão social
 */
export const invalidRazaoSocial: AppError = {
    errorCode: 0x015,
    description: 'Razao Social is invalid.',
    tip: 'Check razaoSocial field.',
    example: [`
         The razao social is at least 1 character long.
    `]
}

/**
 * ERROR - Invalid Shop name
 */
export const invalidShopName: AppError = {
    errorCode: 0x016,
    description: 'Shop name is invalid.',
    tip: 'Check name field.',
    example: [`
        The shop name is at least 3 characters long.
    `]
}

/**
 * ERROR - Invalid Bank Code
 */
export const invalidBankCode: AppError = {
    errorCode: 0x017,
    description: 'Bank Code is invalid.',
    tip: 'Check bank field.',
    example: [`
        The bank code does not exists.
    `]
}

/**
 * ERROR - Invalid Account
 */
export const invalidAccount: AppError = {
    errorCode: 0x018,
    description: 'Account is invalid.',
    tip: 'Check account field.',
    example: [`
        The account is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid Agency Number
 */
export const invalidAgency: AppError = {
    errorCode: 0x019,
    description: 'Agency is invalid.',
    tip: 'Check agency field.',
    example: [`
        The agency is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid cell phone
 */
export const invalidCellphone: AppError = {
    errorCode: 0x01A,
    description: 'Cellphone is invalid.',
    tip: 'Check cellphone field.',
    example: [`
        The cellphone is at least 9 characters long.
    `]
}

/**
 * ERROR - Invalid image type
 */
export const invalidImageType: AppError = {
    errorCode: 0x01B,
    description: 'Image type is invalid.',
    tip: 'It must be a jpg, jpeg or png file.',
    example: [`
        public.jpg
    `]
}

/**
 * ERROR - Invalid image reference
 */
export const invalidImageReference: AppError = {
    errorCode: 0x01C,
    description: 'Image is invalid.',
    tip: 'Check your images urls. It must be a public url to a image file.',
    example: [`
        https://myimages.com/public.jpg
    `]
}

/**
 * ERROR - Invalid category reference
 */
export const invalidCategory: AppError = {
    errorCode: 0x01D,
    description: 'Category is invalid.',
    tip: 'Check category field.',
    example: [`
        Get a full list of categories in ${ PROJECT_HOST }/category/all
    `]
}

/**
 * ERROR - Invalid subcategory reference
 */
export const invalidSubCategory: AppError = {
    errorCode: 0x01E,
    description: 'Subcategory is invalid.',
    tip: 'Check subcategory field.',
    example: [`
        Get a full list of subcategory in ${ PROJECT_HOST }/category/{category_code}/subcategories
    `]
}

/**
 * ERROR - Invalid nationality
 */
export const invalidNationality: AppError = {
    errorCode: 0x01F,
    description: 'Nationality is invalid.',
    tip: 'Check nationality field.',
    example: [`
        1 to NACIONAL,
        2 to INTERNACIONAL
    `]
}

/**
 * ERROR - Invalid product name
 */
export const invalidProductName: AppError = {
    errorCode: 0x020,
    description: 'Product name is invalid.',
    tip: 'Check name field.',
    example: [`
        The product name is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid product name
 */
export const invalidProductDescription: AppError = {
    errorCode: 0x021,
    description: 'Product description is invalid.',
    tip: 'Check description field.',
    example: [`
        The product description is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid Product brand
 */
export const invalidProductBrand: AppError = {
    errorCode: 0x022,
    description: 'Brand is invalid.',
    tip: 'Check brand field.',
    example: [`
        The product brand is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid EAN
 */
export const invalidEAN: AppError = {
    errorCode: 0x023,
    description: 'EAN is invalid.',
    tip: 'Check ean field.',
    example: [`
        The ean is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid SKU
 */
export const invalidSKU: AppError = {
    errorCode: 0x024,
    description: 'SKU is invalid.',
    tip: 'Check sku field.',
    example: [`
        The sku is at least 2 characters long.
    `]
}

/**
 * ERROR - Invalid Product Gender
 */
export const invalidProductGender: AppError = {
    errorCode: 0x025,
    description: 'Gender is invalid.',
    tip: 'Check gender field. It must be M, F or U',
    example: [`
        The product gender is 1 characters long.
    `]
}

/**
 * ERROR - Invalid Product Variations
 */
export const invalidProductVariations: AppError = {
    errorCode: 0x026,
    description: 'Product Variations is invalid.',
    tip: 'Check variations field.',
    example: [`
        The variations must be an object.
    `]
}

/**
 * ERROR - Invalid Variation Height
 */
export const invalidVariationHeight: AppError = {
    errorCode: 0x027,
    description: 'Height is invalid.',
    tip: 'Check height field.',
    example: [`
        The variation height is measured in centimeters.
        Minimum of 10cm.
    `]
}

/**
 * ERROR - Invalid Variation Width
 */
export const invalidVariationWidth: AppError = {
    errorCode: 0x028,
    description: 'Width is invalid.',
    tip: 'Check width field.',
    example: [`
        The variation width is measured in centimeters.
        Minimum of 10cm.
    `]
}

/**
 * ERROR - Invalid Variation Length
 */
export const invalidVariationLength: AppError = {
    errorCode: 0x029,
    description: 'Length is invalid.',
    tip: 'Check length field.',
    example: [`
        The variation length is measured in centimeters.
        Minimum of 10cm.
    `]
}

/**
 * ERROR - Invalid Variation Weight
 */
export const invalidVariationWeight: AppError = {
    errorCode: 0x02A,
    description: 'Weight is invalid.',
    tip: 'Check weight field.',
    example: [`
        The variation weight is measured in grams.
    `]
}

/**
 * ERROR - Invalid Variation Price
 */
export const invalidVariationPrice: AppError = {
    errorCode: 0x02B,
    description: 'Price is invalid.',
    tip: 'Check price field.',
    example: [`
        The price must be positive.
    `]
}

/**
 * ERROR - Invalid Variation Price Discounted
 */
export const invalidVariationPriceDiscounted: AppError = {
    errorCode: 0x02C,
    description: 'Price Discounted is invalid.',
    tip: 'Check price_discounted field.',
    example: [`
        The price discounted must be positive.
    `]
}

/**
 * ERROR - Invalid Variation Size
 */
export const invalidVariationSize: AppError = {
    errorCode: 0x02D,
    description: 'Size is invalid.',
    tip: 'Check size field.',
    example: [`
        Get a full list of sizes in ${ PROJECT_HOST }/size/all
    `]
}

/**
 * ERROR - Invalid Variation Stock
 */
export const invalidVariationStock: AppError = {
    errorCode: 0x02E,
    description: 'Stock is invalid.',
    tip: 'Check stock field.',
    example: [`
        The stock must be positive or 0.
    `]
}

/**
 * ERROR - Invalid Variation Color
 */
export const invalidVariationColor: AppError = {
    errorCode: 0x02F,
    description: 'Color is invalid.',
    tip: 'Check color field.',
    example: [`
        Get a full list of colors in ${ PROJECT_HOST }/size/all
    `]
}

/**
 * ERROR - Invalid Product Reference
 */
export const invalidProductReference: AppError = {
    errorCode: 0x030,
    description: 'Product reference is invalid.',
    tip: 'Check the product Id.',
    example: [
        `{ 
            \'product_id\': \'id\'
        }`
    ]
}

/**
 * ERROR - Invalid Variation Reference
 */
export const invalidVariationReference: AppError = {
    errorCode: 0x031,
    description: 'Variation reference is invalid.',
    tip: 'Check the variation Id.',
    example: [
        `{ 
            \'variation_id\': \'id\'
        }`
    ]
}

/**
 * ERROR - Invalid Variation is not part of Product
 */
export const invalidVariationReferenceToProduct: AppError = {
    errorCode: 0x032,
    description: 'Variation reference is invalid to the product reference.',
    tip: 'Check the variation Id and Product Id.',
    example: [
        `{ 
            \'product_id\': \'id\',
            \'variation_id\': \'id\'
        }`
    ]
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
