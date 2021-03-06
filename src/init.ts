import { recoverLateCredential } from "./services/hub2bAuhService"
import { integrateHub2bOrders, INTEGRATION_INTERVAL } from "./services/orderService"
import { nowIsoDateHub2b } from "./utils/util"

/**
 * This function is called when the application starts
 */
export const init = async () => {

    await recoverLateCredential()

    let start = '2021-06-01T00:00:00'

    let end = '2021-09-30T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-10-01T00:00:00'

    end = '2021-10-31T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-11-01T00:00:00'

    end = '2021-11-19T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-11-20T00:00:00'

    end = '2021-11-25T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-11-26T00:00:00'

    end = '2021-11-26T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-11-27T00:00:00'

    end = '2021-11-27T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-11-28T00:00:00'

    end = '2021-11-28T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-11-29T00:00:00'

    end = '2021-11-29T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-11-30T00:00:00'

    end = '2021-11-30T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-12-01T00:00:00'

    end = '2021-12-02T23:59:59'

    await integrateHub2bOrders(start, end)

    start = '2021-12-03T00:00:00'

    await integrateHub2bOrders(start, nowIsoDateHub2b())

    setInterval(async () => {
        await integrateHub2bOrders()
    }, INTEGRATION_INTERVAL)
}
