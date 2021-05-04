import { Collection, Db } from 'mongodb'
import { User } from '../../models/user'
import { ActivationToken } from '../../models/token'

const USER_COLLECTION = 'user'
const ACTIVATION_TOKEN_COLLECTION = 'activation_token'

let userCollection: Collection<User>
let activationTokenCollection: Collection<ActivationToken>

export const createCollections = ( database: Db ) => {

    userCollection = database.collection<User>( USER_COLLECTION )
    activationTokenCollection = database.collection<ActivationToken>( ACTIVATION_TOKEN_COLLECTION )

}

export {
    userCollection,
    activationTokenCollection,
}
