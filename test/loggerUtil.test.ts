import 'jest'
import { Logger } from '../src/models/logger'
import { log, printLogger } from '../src/utils/loggerUtil'

describe( 'Tests loggerUtil', () => {

    it( 'It should log Event', async ( done ) => {
        log( 'Event called', 'event' )
        done()
    } )

    it( 'Should return a log as String', async ( done ) => {

        const log: Logger = {
            type: 'event',
            severity: 'info',
            service: 'Test',
            timestamp: Date.now().toString(),
            message: 'Test'
        }

        printLogger( log )
        done()
    } )
} )