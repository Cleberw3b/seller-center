import { recoverLateCredential } from "./services/hub2bAuhService"
import { integrateHub2bOrders, INTEGRATION_INTERVAL } from "./services/orderService"

/**
 * This function is called when the application starts
 */
export const init = async () => {

    await recoverLateCredential()

    // setInterval( async () => {
    //     await integrateHub2bOrders()
    // }, INTEGRATION_INTERVAL )
}
