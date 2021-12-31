import { Router, Request, Response, NextFunction } from 'express'
import { createHttpStatus, internalServerError, ok } from '../utils/httpStatus'
import { setupWebhookIntegration } from "../services/orderService";
import { updateStatus } from '../services/orderService';

const router = Router()

router.post('/order', async (req: Request, res: Response, next: NextFunction) => {

    const result = await updateStatus(req.body.IdOrder, req.body.OrderStatus)

    if (!result)
        return res
            .status(internalServerError.status)
            .send(createHttpStatus(internalServerError))

    return res
        .status(ok.status)
        .send(req.body)
})

router.post('/order/webhook', async (req: Request, res: Response, next: NextFunction) => {

    const webhookIntegration = await setupWebhookIntegration()

    if (!webhookIntegration)
        return res
            .status(internalServerError.status)
            .send(createHttpStatus(internalServerError))

    return res
        .status(ok.status)
        .send(req.body)
})

export { router as integrationRouter }
