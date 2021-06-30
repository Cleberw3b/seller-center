//
//      Login Service
//

import { User } from "../models/user"
import { comparePassword, getToken } from "../utils/cryptUtil"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
import { sendEmailToResetPassword } from "./mailService"
import { findUser } from "./userService"

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

    if ( !user.isActive || !await comparePassword( password, user.password ) ) return null

    delete user.password

    return user
}

/**
 * forgetPassword
 *
 * @param email - 
 */
export const forgetPassword = async ( user: User ): Promise<boolean> => {

    if ( !user ) return false

    const result = await sendEmailToResetPassword( user )

    return result ? true : false
}
