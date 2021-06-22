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
import { colorRouter } from './colorRouter'
import { sizeRouter } from './sizeRouter'
import { bankRouter } from './bankRouter'

export const root = rootRouter
export const healthCheck = healthCheckRouter
export const auth = authRouter
export const account = accountRouter
export const product = productRouter
export const category = categoryRouter
export const color = colorRouter
export const size = sizeRouter
export const bank = bankRouter
