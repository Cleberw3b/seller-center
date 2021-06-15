
export interface Product {
    _id?: any,
    shopId: any,
    images: {
        id: any,
        name: string,
        alt_text: string,
        url: string,
    }[],
    name: string,
    description: string,
    brand: string,
    more_info?: string,
    ean?: string,
    sku: string,
    price: number,
    price_discounted?: number
    height?: number,
    width?: number,
    length?: number,
    weight?: number,

    variations: {
        size: number | string,
        stock: number,
        color: string,
    }[],

    nationality: {
        id: any,
        name: string,
    },
    category: {
        id: any,
        name: string,
        sub_category: [
            {
                id: any,
                name: string,
            }
        ]
    },
}

export interface MuterFile {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    size: number,
    bucket: string,
    key: string,
    acl: string,
    contentType: string,
    contentDisposition: string | null,
    storageClass: string,
    serverSideEncryption: string | null,
    metadata: { fieldName: string },
    location: string,
    etag: string,
    versionId?: any
}
