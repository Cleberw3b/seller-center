//
//      Interface Order
//

import { HUB2B_Order } from "./hub2b"

export interface Order {
    _id?: any,
    shop_id: any,
    order: HUB2B_Order
}

export interface OrderIntegration {
    _id?: any,
    lastUpdate: string,
    updateFrom: string,
    updateTo: string,
}
