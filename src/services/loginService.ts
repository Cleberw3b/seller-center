//
//      Login Service
//

import { User } from "../models/user"
import { comparePassword, getToken, hashPassword } from "../utils/cryptUtil"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
import { findUser, findUserByEmail } from "./userService"

export const loginUser = async ( user: User ) => {

    const token = getToken( user )

    const auth = true

    return { auth, token }

}

/**
 * Verifies whether a login is Valid
 *
 * @param email - 
 * @param username -
 */
export const isUserLoginValid = async ( email: string, username: string, password: string ): Promise<User | null> => {

    if ( !password ) {
        log( `Hashing Error`, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }

    const user = await findUser( email, username )

    if ( !user || !user.password ) return null

    if ( await comparePassword( password, user.password ) || !user.isActive ) return null

    delete user.password

    return user
}


/**
 * forgetPassword
 *
 * @param email - 
 */
export const forgetPassword = async ( email: string ): Promise<boolean> => {

    const user = findUserByEmail( email )

    if ( !user ) return false

    // TODO -> Generate token and send email

    return false
}
