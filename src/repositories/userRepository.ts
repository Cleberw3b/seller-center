//
//      User Repository
//

import { User } from "../models/user"
import { IS_PRODUCTION_ENV } from "../utils/consts"
import { userCollection } from "../utils/db/collections"
import { log } from "../utils/loggerUtil"
import { getFunctionName } from "../utils/util"

/**
 * Save a new user and creates account
 * 
 * @param user - new user
 */
export const createNewUser = async ( user: User ): Promise<User | null> => {
    try {

        const result = await userCollection.insertOne( user )

        return result.ops[0] ? result.ops[0] : null

    } catch ( error ) {
        log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}


type FindOne = {
    username?: string,
    email?: string
}

/**
 * Find user by email or username
 * 
 * @param user
 */
export const findOneUser = async ( { username, email }: FindOne ): Promise<User | null> => {
    try {

        let result = null

        if ( email )
            result = await userCollection.findOne( { email } )

        else if ( username )
            result = await userCollection.findOne( { username } )

        return result

    } catch ( error ) {
        log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Find user by Id
 * 
 * @param _id
 */
export const findUserById = async ( _id: any ): Promise<User | null> => {
    try {

        return await userCollection.findOne( { _id } )

    } catch ( error ) {
        log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Disable user
 * 
 * @param  id - User Id
 */
export const disableUser = async ( _id: any ): Promise<User | null> => {
    try {

        const update = {
            "$set": {
                isActive: false,
            }
        }

        const result = await userCollection.findOneAndUpdate( { _id }, update )

        return result.value ? result.value : null

    } catch ( error ) {
        log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Enable user
 * 
 * @param id - User Id
 */
export const enableUser = async ( _id: any ) => {
    try {

        const update = {
            "$set": {
                isActive: true,
            }
        }

        const result = await userCollection.findOneAndUpdate( { _id }, update )

        return result.value ? result.value : null

    } catch ( error ) {
        log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * Delete user
 * 
 * @param id - User Id
 */
export const deleteUser = async ( _id: any ): Promise<User | null> => {

    // Do not use in production
    if ( IS_PRODUCTION_ENV ) throw new Error( "Impossible to execute command." )

    try {

        const result = await userCollection.findOneAndDelete( { _id } )

        return result.value ? result.value : null

    } catch ( error ) {
        log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}

/**
 * update user password
 * 
 * @param id - User Id
 */
export const updatePassword = async ( _id: any, password: string ): Promise<User | null> => {
    try {

        const update = {
            "$set": {
                password,
            }
        }

        const result = await userCollection.findOneAndUpdate( { _id }, update )

        return result.value ? result.value : null

    } catch ( error ) {
        log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )
        return null
    }
}
