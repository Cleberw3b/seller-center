import logger from 'morgan'
import { LoggerType, Logger, SeverityType } from '../models/logger'
import { ENABLE_LOG } from './consts'
import { fillString, nowForPostgre, nowIsoDate } from './util'

/**
 * Função responsável por criar e salvar logs
 * 
 * @param message 
 * @param type 
 * @param eventType 
 */
export const log = (
    message: string,
    type: LoggerType,
    service: string = 'Authentication Service',
    severity: SeverityType = 'INFO'
) => {

    const timestamp = nowForPostgre()

    if ( type === 'REQUEST' || type === 'RESPONSE' ) service = ''

    const log: Logger = { type, severity, service, timestamp, message }

    if ( ENABLE_LOG ) printLogger( log )
}

const loggerToString = ( log: Logger ) => {

    const time = nowIsoDate()

    const { severity, type, service, message } = log

    return `${ fillString( severity, ' ', 8 ) } - ${ time } - ${ fillString( type, ' ', 8 ) } - ${ service } - ${ message }`

}

export const printLogger = ( log: Logger ) => {
    console.debug( loggerToString( log ) )
}

export { logger }
