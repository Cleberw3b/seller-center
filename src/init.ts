import { HUB2B_Invoice, HUB2B_Status } from "./models/hub2b"
import { criarProdutoHub2b, generateAccessTokenV2, getInvoice, getTracking, listOrders, postInvoice, postTracking, updateStatus } from "./services/hub2b"
import { nowIsoDate } from "./utils/util"

/**
 * This function is called when the application starts
 */
export const init = async () => {

}
