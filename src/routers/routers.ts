/**
 * Routes List
 */

// TODO -> Transform into typescript module

import { rootRouter } from './root'
import { healthCheckRouter } from './healthCheck'
import { authRouter } from './authRouter'

export const root = rootRouter
export const healthCheck = healthCheckRouter
export const auth = authRouter
