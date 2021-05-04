import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import { DEFAULT_PORT } from './utils/consts'
import * as routers from './routers/routers'
import { notFountMiddleware, errorMiddleware, loggerRequest, loggerResponse, authMiddleware } from './utils/middlewares'

// Create a express app
const app = express()

// Middleware to log Requests
app.use( loggerRequest )

// Middleware to log Response
app.use( loggerResponse )

// Middleware for security policies
app.use( helmet() )

// Middleware to compress
app.use( compression() )

// Middleware to parse data to Json
app.use( express.json() )

// Middleware to parse only url encoded
app.use( express.urlencoded( { extended: false } ) )

// Define routes and their handles
app.use( '/', routers.root )
app.use( '/healthcheck', routers.healthCheck )
app.use( '/auth', routers.auth )

app.use( authMiddleware )

// Define Secure routers here

// TODO -> app.use( '/others', routers.other )

// Middleware to catch 404 and forward to error handler
app.use( notFountMiddleware )

// Middleware to handle error
app.use( errorMiddleware )

// Get default port and store in Express.
app.set( 'port', DEFAULT_PORT )

export default app
