/**
 * Routes List
 */

// TODO -> Transform into typescript module

import { rootRouter } from './root'
import { healthCheckRouter } from './healthCheck'
import { authRouter } from './authRouter'
import { accountRouter } from './accountRouter'

export const root = rootRouter
export const healthCheck = healthCheckRouter
export const auth = authRouter
export const account = accountRouter
