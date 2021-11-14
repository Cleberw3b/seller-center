import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate';
import TenantsController from '../controllers/TenantsController';

const tenantRouter = Router()
const tenantsController = new TenantsController();

/**
 * POST -> Creates a tenant (Sellers)
 */
 tenantRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      website: Joi.string().required(),
      documentNumber: Joi.string().required(),
      companyName: Joi.string().required(),
      ownerName: Joi.string().required(),
      ownerEmail: Joi.string().required(),
      ownerPhoneNumber: Joi.string().required(),
      idAgency: Joi.number().required(),
      stateInscription: Joi.string().required(),
      address: {
          zipCode: Joi.string().required(),
          street: Joi.string().required(),
          neighborhood: Joi.string().required(),
          number: Joi.number().required(),
          city: Joi.string().required(),
          state: Joi.string().required(),
          country: Joi.string().required(),
          reference: Joi.string()
      }
    },
  }),
  tenantsController.create,
)

/**
 * PUT -> Update a tenant (Seller)
 */
 tenantRouter.put(
  '/:idTenant',
  celebrate({
    [Segments.PARAMS]: {
      idTenant: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      website: Joi.string().required(),
      documentNumber: Joi.string().required(),
      companyName: Joi.string().required(),
      ownerName: Joi.string().required(),
      ownerEmail: Joi.string().required(),
      ownerPhoneNumber: Joi.string().required(),
      idAgency: Joi.number().required(),
      stateInscription: Joi.string().required(),
      address: {
          zipCode: Joi.string().required(),
          street: Joi.string().required(),
          neighborhood: Joi.string().required(),
          number: Joi.number().required(),
          city: Joi.string().required(),
          state: Joi.string().required(),
          country: Joi.string().required(),
          reference: Joi.string()
      }
    },
  }),
  tenantsController.update,
)

/**
 * GET -> Retrieve tenant (Seller)
 */
 tenantRouter.get(
  '/:idTenant',
  celebrate({
    [Segments.PARAMS]: {
      idTenant: Joi.number().required(),
    },
  }),
  tenantsController.show,
)

export { tenantRouter }