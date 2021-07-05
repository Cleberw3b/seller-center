//
//      User Repository
//

import { MongoError, ObjectID } from "mongodb"
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

        const userInserted = result.ops[0] ? result.ops[0] : null

        if ( !userInserted ) return null

        delete userInserted.password

        return userInserted

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
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

        const projection = { username: 1, email: 1, password: 1, role: 1, isActive: 1 }

        let result = null

        if ( email )
            result = await userCollection.findOne( { email }, { projection } )

        else if ( username )
            result = await userCollection.findOne( { username }, { projection } )

        return result

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}

/**
 * Find user by Id
 * 
 * @param _id
 */
export const findUserById = async ( _id: string ): Promise<User | null> => {

    const projection = { username: 1, email: 1, role: 1, isActive: 1 }

    try {

        const user = await userCollection.findOne( { _id: new ObjectID( _id ) }, { projection } )

        return user

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
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

        const options = {
            "$set": {
                isActive: false,
            }
        }

        const result = await userCollection.findOneAndUpdate( { _id: new ObjectID( _id ) }, options )

        return result.value ? result.value : null

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
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

        const options = {
            "$set": {
                isActive: true,
            }
        }

        const result = await userCollection.findOneAndUpdate( { _id: new ObjectID( _id ) }, options )

        return result.value ? result.value : null

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
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

    try {

        // Do not use in production
        if ( IS_PRODUCTION_ENV ) throw new Error( "Impossible to execute command." )

        const result = await userCollection.findOneAndDelete( { _id: new ObjectID( _id ) } )

        return result.value ? result.value : null

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
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

        const options = {
            "$set": {
                password,
            }
        }

        const result = await userCollection.findOneAndUpdate( { _id: new ObjectID( _id ) }, options )

        return result.value ? result.value : null

    } catch ( error ) {

        if ( error instanceof MongoError || error instanceof Error )
            log( error.message, 'EVENT', `User Repository - ${ getFunctionName() }`, 'ERROR' )

        return null
    }
}
