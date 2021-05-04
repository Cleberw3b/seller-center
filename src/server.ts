import app from './expressConfig'
import http from 'http'
import { DEFAULT_PORT } from './utils/consts'
import { loadDatabase, closeConnection } from './utils/db/mongoConnector'
import { init } from './init'

// Init dependencies
loadDatabase( app )

// Create HTTP server.
const server = http.createServer( app )

// Event listener for HTTP server 'error' event.
const onError = ( error: any ) => {
    if ( error.syscall !== 'listen' ) {
        throw error
    }
    // handle specific listen errors with friendly messages
    switch ( error.code ) {
        case 'EACCES':
            console.error( 'Port ' + DEFAULT_PORT + ' requires elevated privileges' )
            exitProcess( 1 )
            break
        case 'EADDRINUSE':
            console.error( 'Port ' + DEFAULT_PORT + ' is already in use' )
            exitProcess( 1 )
            break
        default:
            throw error
    }
}

// Event listener for HTTP server 'listening' event.
const onListening = () => {
    console.debug( 'Listening on port ' + DEFAULT_PORT )
}

// Event listener for HTTP server 'close' event.
const onClose = () => {
    closeConnection()
    console.debug( 'Server shutdown' )
}

// Await for app to be ready before stating listening
// Listen on provided port, on all network interfaces.
app.on( 'ready', () => {
    server.listen( DEFAULT_PORT )
    init()
} )

// Add on error handle
server.on( 'error', onError )

// Add on listening handle
server.on( 'listening', onListening )

// Add on close handle
server.on( 'close', onClose )

// Closes connections to any dependency when exiting process
process.on( 'SIGINT', () => {
    console.debug( 'Process exiting...' )
    exitProcess()
} )

// If an unhandled rejection thrown it prints and exit application
process.on( 'unhandledRejection', ( err ) => {
    console.error( err )
    exitProcess( 1 )
} )

// Exit application
const exitProcess = ( code: number = 0 ) => {
    closeConnection()
    process.exit( code )
}
