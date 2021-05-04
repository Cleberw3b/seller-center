// setup.js

import app from '../../src/expressConfig'
import { loadDatabase } from '../../src/utils/db/mongoConnector'

module.exports = async () => {

    await loadDatabase( app )

}
