import 'jest'

describe( 'Teste', () => {

    it.skip( 'Test ...', async ( done ) => {

        const expected = true

        expect( expected ).toBeTruthy()
        done()
    } )
} )
