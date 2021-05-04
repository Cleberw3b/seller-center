import 'jest'
import { isValid } from '../src/utils/validations/someValidation'

describe( 'Test validations', () => {

    it( 'Test validations true', async ( done ) => {

        const expectted = isValid( 1 )

        expect( expectted ).toBeTruthy()
        done()
    } )

    it( 'Test validations false', async ( done ) => {

        const expectted = isValid()

        expect( expectted ).toBeFalsy()
        done()
    } )
} )
