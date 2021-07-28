//
//     Global interfaces
//

/**
 * Reescreve Interface `global.NodeJS.ProcessEnv`
 */
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'test' | 'production'
            PORT?: number
            MONGO_DB_NAME: string
            MONGO_ATLAS_URL: string
            ENABLE_LOG?: string
            SECRET: string
            CONTACT_EMAIL: string
            EMAIL_PASSWORD: string
            PROJECT_HOST: string
            FRONT_END_URL: string
            AWS_ACCESS_KEY: string
            AWS_ACCESS_SECRET: string
            HUB2B_TENANT: string
            HUB2B_ACCESS_KEY_V1: string
            HUB2B_CLIENT_ID: string
            HUB2B_CLIENT_SECRET: string
            HUB2B_USERNAME: string
            HUB2B_PASSWORD: string
        }
        interface Global {
        }
    }
}
