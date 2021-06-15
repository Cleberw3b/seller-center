/**
 * Routes List
 */

// TODO -> Transform into typescript module

import { rootRouter } from './root'
import { healthCheckRouter } from './healthCheck'
import { authRouter } from './authRouter'
import { accountRouter } from './accountRouter'
import { productRouter } from './productRouter'

export const root = rootRouter
export const healthCheck = healthCheckRouter
export const auth = authRouter
export const account = accountRouter
export const product = productRouter