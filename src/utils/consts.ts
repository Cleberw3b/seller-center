//
//     Constants
//

import * as path from 'path'

let isTest = false
let isProd = false
let isDev = false
let mongoDbName = process.env.MONGO_DB_NAME
let mongoURL = ''

/**
 * Verifies what environment we are working with
 */
switch ( process.env.NODE_ENV ) {
    case 'test':
        isTest = true
        mongoDbName = 'dbname-prod'
        break
    case 'production':
        isProd = true
        mongoDbName = 'dbname-prod'
        break
    default:
        isDev = true
}

/**
 * Exports all consts
 */

export const IS_DEVELOPMENT_ENV = isDev

export const IS_PRODUCTION_ENV = isProd

export const IS_TEST_ENV = isTest

export const DEFAULT_PORT = process.env.PORT || '8080'

export const ROOT_DIR = path.resolve( process.cwd() )

export const ENABLE_LOG = process.env.ENABLE_LOG || 0

export const MONGO_DB_URL = mongoURL + process.env.MONGO_ATLAS_URL

export const MONGO_DB_NAME = mongoDbName

export const SECRET = IS_PRODUCTION_ENV ? process.env.SECRET + '' : 'secret'

export const PROJECT_EMAIL = 'contato@example.com.br'

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD + ''

export const PROJECT_NAME = 'Auth Server'

export const PROJECT_HOST = 'http://localhost'
