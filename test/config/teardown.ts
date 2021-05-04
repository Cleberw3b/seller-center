// teardown.js
import { closeConnection } from '../../src/utils/db/mongoConnector'

module.exports = async () => {

    await closeConnection()

}
