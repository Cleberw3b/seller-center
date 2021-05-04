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
        }
        interface Global {
        }
    }
}

// convert it into a module by adding an empty export statement.
export { }
