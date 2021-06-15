import { criarProdutoHub2b, generateAccessTokenV2 } from "./services/hub2b"

/**
 * This function is called when the application starts
 */
export const init = async () => {

    await generateAccessTokenV2()
}
