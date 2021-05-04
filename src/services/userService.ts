//
//      User Service
//

import { Role, User } from "../models/user"
import { createNewUser, enableUser, findOneUser, findUserById, updatePassword } from "../repositories/userRepository"
import { hashPassword } from "../utils/cryptUtil"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"
import { sendEmailToActiveAccount } from "./mailService"
import { isTokenValid } from "./tokenService"

/**
 * Save a new user and creates account
 * 
 * @param email
 * @param password
 */
export const createUser = async ( email: string, password: string, role?: Role | undefined ): Promise<User | null> => {

    password = await hashPassword( password )

    if ( !password ) {
        log( `Hashing Error`, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }

    const _role: Role = role ? role : 'seller'

    const user: User = {
        email,
        password,
        isActive: false,
        role: _role,
    }

    const newUser = await createNewUser( user )

    if ( !newUser ) {
        log( `Could not create new user ${ email }`, 'EVENT', getFunctionName(), 'ERROR' )
        return null
    }

    log( `User ${ newUser.email } has been created.`, 'EVENT', getFunctionName() )

    delete newUser?.password

    sendEmailToActiveAccount( newUser )

    return newUser
}

/**
 * Find an user by email or username
 * 
 * @param email - email
 * @param username - username
 */
export const findUser = async ( email?: string, username?: string ): Promise<User | null> => {

    let result = null

    if ( !email || !username ) return result

    if ( email )
        result = await findUserByEmail( email )

    else if ( username )
        result = await findUserByUsername( username )

    return result
}

/**
 * Find an user by its username
 *
 * @param username - username
 */
export const findUserByUsername = async ( username: string ): Promise<User | null> => {

    const user = await findOneUser( { username } )

    user ? log( `User ${ username } has been found.`, 'EVENT', getFunctionName() )
        : log( `Could not find user  ${ username }`, 'EVENT', getFunctionName() )

    return user
}

/**
 * Find an user by its email
 *
 * @param email - user email
 */
export const findUserByEmail = async ( email: string ): Promise<User | null> => {

    const user = await findOneUser( { email } )

    user ? log( `User ${ email } has been found.`, 'EVENT', getFunctionName() )
        : log( `Could not find user  ${ email }`, 'EVENT', getFunctionName() )

    return user
}

/**
 * Find an user by its id
 *
 * @param _id - user id
 */
export const findById = async ( _id: string ): Promise<User | null> => {

    const user = await findUserById( { _id } )

    user ? log( `User ${ _id } has been found.`, 'EVENT', getFunctionName() )
        : log( `Could not find user  ${ _id }`, 'EVENT', getFunctionName() )

    return user
}

/**
 * Creates new password for user
 * 
 * @param _id           - user id
 * @param newPassword   - new password
 */
export const newPassword = async ( _id: any, newPassword: string ): Promise<User | null> => {

    newPassword = await hashPassword( newPassword )

    const user = await updatePassword( _id, newPassword )

    user ? log( `User ${ _id } password has been updated.`, 'EVENT', getFunctionName() )
        : log( `Could not update ${ _id } password`, 'EVENT', getFunctionName() )

    delete user?.password

    return user
}

/**
 * Activates an User from their e-mail
 * 
 * @param token 
 * @returns User activated
 */
export const activateUser = async ( token: string ): Promise<User | null> => {

    const activationToken = await isTokenValid( token )

    if ( !activationToken ) return null

    const user = await enableUser( activationToken.user_id )

    delete user?.password

    return user
}
