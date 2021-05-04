//
//     User Validation
//

import { findUserByEmail } from "../../services/userService"
import { AppError, invalidEmail, invalidPassword, userExists } from "../errors/errors"
import { isEmailValid, isPasswordSecure } from "../util"

/**
 * Verifies whether the new user can be created
 * 
 * @param email
 * @param password
 * @returns `true` if new user can be created or `false` the other way around
 */
export const isNewUserValid = async ( email: string, password: string ): Promise<AppError[]> => {

    const errors: AppError[] = []

    if ( !email || !isEmailValid( email ) ) errors.push( invalidEmail )

    if ( !password || !isPasswordSecure( password ) ) errors.push( invalidPassword )

    if ( errors.length > 0 ) return errors

    if ( await findUserByEmail( email ) ) errors.push( userExists )

    return errors
}
