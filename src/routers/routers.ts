/**
 * Routes List
 */

// TODO -> Transform into typescript module

import { rootRouter } from './root'
import { healthCheckRouter } from './healthCheck'
import { authRouter } from './authRouter'
import { accountRouter } from './accountRouter'
import { productRouter } from './productRouter'
import { categoryRouter } from './categoryRouter'
import { bankRouter } from './bankRouter'
import { orderRouter } from './orderRouter'
import { tenantRouter } from './tenantRouter'

export const root = rootRouter
export const healthCheck = healthCheckRouter
export const auth = authRouter
export const account = accountRouter
export const product = productRouter
export const category = categoryRouter
export const bank = bankRouter
export const order = orderRouter
export const tenant = tenantRouter
