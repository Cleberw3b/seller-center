import { generateAccessTokenV2 } from "./services/hub2b"


/**
 * This function is called when the application starts
 */
export const init = async () => {
    generateAccessTokenV2()
}
