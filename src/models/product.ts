export interface Product {
    _id?: any,
    shopId: any,
    images: string[],
    category: number,
    subCategory: number,
    nationality: number,
    name: string,
    description: string,
    brand: string,
    more_info: string,
    ean: string,
    sku: string,
    gender: 'M' | 'F' | 'U',
    height: number,
    width: number,
    length: number,
    weight: number,
    price: number,
    price_discounted: number,
    variations: Variation[],
    isActive: boolean
}

export interface Variation {
    _id?: any,
    product_id: any,
    size: number,
    stock: number,
    color: number
}
