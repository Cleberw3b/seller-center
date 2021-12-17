
import { Product } from "../../models/product"
import * as express from "express"
import { ShopInfo } from "../../models/account"
import { Variation } from "../../models/product"
import { User } from "../../models/user"
import {Order} from "../../models/order"

declare global {
    namespace Express {
        interface Request {
            user?: User,
            shop?: ShopInfo,
            product?: Product,
            variation?: Variation,
            order?: Order
        }
    }
}
