//
//     Constants
//

import * as path from 'path'

let isTest = false
let isProd = false
let isDev = false

/**
 * Verifies what environment we are working with
 */
switch ( process.env.NODE_ENV ) {
    case 'test':
        isTest = true
        break
    case 'production':
        isProd = true
        break
    default:
        isDev = true
}

/**
 * Exports all consts
 */

export const PROJECT_NAME = 'Seller Center Ozllo'

export const IS_DEVELOPMENT_ENV = isDev

export const IS_PRODUCTION_ENV = isProd

export const IS_TEST_ENV = isTest

export const ROOT_DIR = path.resolve( process.cwd() )

export const DEFAULT_PORT = process.env.PORT || '8080'

export const ENABLE_LOG = process.env.ENABLE_LOG || 0

export const MONGO_DB_URL = process.env.MONGO_ATLAS_URL || 'localhost:21070'

export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'test'

export const SECRET = process.env.SECRET || 'secret'

export const PROJECT_EMAIL = process.env.CONTACT_EMAIL || ''

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || ''

export const PROJECT_HOST = process.env.PROJECT_HOST || 'http://localhost'

export const FRONT_END_URL = process.env.FRONT_END_URL || 'http://localhost'

export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || ''

export const AWS_ACCESS_SECRET = process.env.AWS_ACCESS_SECRET || ''

export const AWS_REGION = "sa-east-1"

export const IMPORT_FOLDER = `${ ROOT_DIR }/import`

export const HUB2B_URL_V1 = "https://eb-api.plataformahub.com.br/RestServiceImpl.svc"

export const HUB2B_URL_V2 = "https://rest.hub2b.com.br"

export const HUB2B_TENANT = process.env.HUB2B_TENANT || ''

export const HUB2B_ACCESS_KEY_V1 = process.env.HUB2B_ACCESS_KEY_V1 || ''

export const HUB2B_CLIENT_ID = process.env.HUB2B_CLIENT_ID || ''

export const HUB2B_CLIENT_SECRET = process.env.HUB2B_CLIENT_SECRET || ''

export const HUB2B_USERNAME = process.env.HUB2B_USERNAME || ''

export const HUB2B_PASSWORD = process.env.HUB2B_PASSWORD || ''
