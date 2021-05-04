//
//     Declara códigos de HttpStatus suportados pelo VPP-Aviso
//

import { AppError } from './errors/errors'

/**
 * Lista de http status code suportados
 */
type HttpStatusCode =
    0 |
    200 |
    201 |
    204 |
    301 |
    302 |
    308 |
    400 |
    401 |
    403 |
    404 |
    408 |
    500 |
    503 |
    504 |
    508

/**
 *  Lista de http message para os códigos suportados acima
 */
type HttpMessage =
    'Ok' |
    'Created' |
    'No Content' |
    'Found' |
    'Permanent Redirect' |
    'Bad Request' |
    'Unauthorized' |
    'Forbidden' |
    'Not Found' |
    'Request Timeout' |
    'Internal Server Error' |
    'Response timeout' |
    'Gateway Timeout' |
    'Service Unavailable'

/**
 * Descreve Interface HttpStatus
 */
export interface HttpStatus {
    status: HttpStatusCode
    message: HttpMessage | string
}

/**
 * HttpStatus Ok
 */
export const ok: HttpStatus = { status: 200, message: 'Ok' }

/**
 * HttpStatus Created
 */
export const created: HttpStatus = { status: 201, message: 'Created' }

/**
 * HttpStatus No Content
 */
export const noContent: HttpStatus = { status: 204, message: 'No Content' }

/**
 *  HttpStatus Found
 */
export const found: HttpStatus = { status: 302, message: 'Found' }

/**
 *  HttpStatus Permanent Redirect
 */
export const permanentRedirect: HttpStatus = { status: 308, message: 'Permanent Redirect' }

/**
 * HttpStatus Bad Request
 */
export const badRequest: HttpStatus = { status: 400, message: 'Bad Request' }

/**
 * HttpStatus Unauthorized
 */
export const unauthorized: HttpStatus = { status: 401, message: 'Unauthorized' }

/**
 * HttpStatus Forbidden
 */
export const forbidden: HttpStatus = { status: 403, message: 'Forbidden' }

/**
 * HttpStatus Not Found
 */
export const notFound: HttpStatus = { status: 404, message: 'Not Found' }

/**
 * HttpStatus Request Timeout
 */
export const requestTimeout: HttpStatus = { status: 408, message: 'Request Timeout' }

/**
 * HttpStatus Internal Server Error
 */
export const internalServerError: HttpStatus = { status: 500, message: 'Internal Server Error' }

/**
 * HttpStatus Response timeout Error
 */
export const responseTimeoutError: HttpStatus = { status: 503, message: 'Response timeout' }

/**
 * HttpStatus Gateway Timeout Error
 */
export const gatewayTimeoutError: HttpStatus = { status: 504, message: 'Gateway Timeout' }

/**
 * HttpStatus Internal Server Error
 */
export const serviceUnavailable: HttpStatus = { status: 508, message: 'Service Unavailable' }

/**
 * Interface HttpStatusResponse
 */
export interface HttpStatusResponse extends HttpStatus {
    errors?: AppError | AppError[]
}

/**
 * Cria um http error
 * 
 * @param HttpStatus 
 * @param error 
 * @param message 
 */
export const createHttpStatus = ( httpStatus: HttpStatus, errors?: AppError | AppError[] ) => {
    const newError: HttpStatusResponse = {
        status: httpStatus.status,
        message: httpStatus.message,
        errors
    }

    return newError
}

/**
 * Lista de Http Errors
 */
const errorHttpStatusList = [
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    requestTimeout,
    internalServerError,
    responseTimeoutError,
    gatewayTimeoutError,
    serviceUnavailable
]

/**
 * Retorna erro com o código `HttpStatusCode`
 */
export const findErrorByStatus = ( errorCode: HttpStatusCode ) => {
    return errorHttpStatusList.find( httpStatus => httpStatus.status === errorCode ) || internalServerError
}
