import { Express } from 'express'
import { MongoClient, MongoClientOptions } from 'mongodb'
import { IS_TEST_ENV, MONGO_DB_NAME, MONGO_DB_URL } from '../consts'
import { createCollections } from './collections'

/**
 * Defines a mongo client options object
 * 
 * @see `MongoClientOptions`
 */
const mongoClientOptions: MongoClientOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
    connectTimeoutMS: 3600000,
    socketTimeoutMS: 3600000
}

/**
 * Defines a mongo client object
 * 
 * @param MONGO_DB_URL is the database url to connect
 * @param mongoClientOptions are options to configure mongo connection
 */
const mongoClient = new MongoClient( MONGO_DB_URL, mongoClientOptions )

// Event listening for database errors
mongoClient.on( 'error', ( error ) => {
    console.error( 'Database error' )
    console.error( error )
} )

// Event listening when database is connected
mongoClient.on( 'open', async () => {

    console.debug( 'Database connected' )

    // Create collection ( repository ) 
    await createCollections( mongoClient.db( MONGO_DB_NAME ) )
} )

// Event listening when database is closed
mongoClient.on( 'close', ( client: MongoClient ) => {
    if ( client && !client.isConnected() )
        console.debug( 'Database disconnected.' )
} )

/**
 * Try to connect to server using mongo client,
 * load database and create/retrieve collections
 */
export const loadDatabase = async ( app: Express ) => {

    try {
        // If is already connect return
        if ( mongoClient.isConnected() ) return

        // Try to connect
        await mongoClient.connect()

        // emit event to init server
        if ( !IS_TEST_ENV ) app.emit( 'ready' )

    } catch ( error ) {
        console.error( 'Não foi possível conectar com o banco de dados.' )
        console.log()
        console.log( MONGO_DB_URL )
        console.log()
        console.error( error )
    }
}

/**
 * Closes current mongo client connection to server
 */
export const closeConnection = () => {
    mongoClient.close()
}
