

export interface HUB2B_Credentials {
    _id?: any,
    access_token: string,
    expires_in: number,
    refresh_token: string,
    token_type: string,
    update_at: number
}

export interface HUB2B_Product {
    sku: any,
    parentSKU: string,
    ean13: string | undefined,
    warrantyMonths: number,
    handlingTime: number,
    stock: string,
    weightKg: string | undefined,
    url: string,
    sourceId: string,
    categoryCode: string,
    name: string,
    sourceDescription: string,
    description: string,
    brand: string,
    videoURL?: string,
    ncm: string,
    idProductType: number,
    idTypeCondition: number,
    shippingType: string,
    height_m: string | undefined,
    width_m: string | undefined,
    length_m: string | undefined,
    priceBase: string,
    priceSale: string,
    images: {
        url: string
    }[],
    specifications: {
        name: string,
        value: string,
        type: number
    }[]
}[]

export interface HUB2B_Reference {
    idTenant: number,
    store: string,
    id: number,
    virtual: string,
    source: string,
    destination: string,
    system: {
        source: string,
        destination: string
    }
}

export interface HUB2B_Address {
    address: string,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    zipCode: string,
    additionalInfo: string,
    reference: string,
    number: string
}

export interface HUB2B_Shipping {
    shippingDate: string,
    estimatedDeliveryDate: String,
    responsible: string,
    provider: string,
    service: string,
    price: number,
    receiverName: string,
    address: HUB2B_Address
}

export interface HUB2B_Payment {
    method: string,
    paymentDate: string,
    purchaseDate: string,
    approvedDate: string,
    totalAmount: number,
    totalAmountPlusShipping: number,
    totalDiscount: number,
    installments: number,
    address: HUB2B_Address
}

export interface HUB2B_Status {
    status: 'pending' | 'approved' | 'invoiced' | 'shipped' | 'delivered' | 'canceled' | 'completed',
    updatedDate: string,
    active: boolean,
    message: string
}

export interface HUB2B_Customer {
    name: string,
    documentNumber: string,
    telephone: string,
    mobileNumber: string,
    email: string
}

export interface HUB2B_Product_Order {
    idProduct: number,
    sku: string,
    name: string,
    quantity: number,
    unity: string,
    price: number,
    shippingCost: number,
    discount: number,
    type: string
}

export interface HUB2B_Order_Notes {
    idUser: number,
    createDate: string,
    message: string
}

export interface HUB2B_Order_Additional_Info {
    transferDate: string,
    transferAmount: number
}

export interface HUB2B_Order {
    reference: HUB2B_Reference,
    shipping: HUB2B_Shipping,
    payment: HUB2B_Payment,
    status: HUB2B_Status
    customer: HUB2B_Customer
    createdDate: string,
    canceledDate: string,
    products: HUB2B_Product_Order[]
    orderNotes: HUB2B_Order_Notes[]
    orderAdditionalInfos: HUB2B_Order_Additional_Info[]
}

export interface HUB2B_Invoice {
    xml?: string,
    key: string,
    number: string,
    cfop: string,
    series: string,
    totalAmount: 1,
    issueDate: string,
    xmlReference: string,
    packages: number
}

export interface HUB2B_Tracking {
    code: string,
    url: string,
    shippingDate: string,
    shippingProvider: string,
    shippingService: string
}

export interface HUB2B_Catalog_Product {
    id: number,
    idTenant: number,
    sourceId: string,
    destinationId: string,
    name: string,
    idSystemSource: number,
    idSystemDestination: number,
    categorization: {
      source: {
        id: number,
        name: string,
        code: string,
        parentCode: string,
        structure: string,
        completeStructure: string,
        map: true
      },
      destination: {
        id: number,
        code: string,
        parentCode: string,
        systemCode: string,
        name: string,
        completeStructure: string,
        active: true,
        idSystem: number
      }
    },
    description: {
      sourceDescription: string,
      description: string,
      descriptionType: string,
      idTemplate: number
    },
    idTypeBuying: number,
    idTypeListing: number,
    idTypeCondition: number,
    storeId: string,
    ean: string,
    brand: string,
    ncm: string,
    dimensions: {
      height: number,
      width: number,
      length: number,
      weight: number
    },
    images: [
      {
        idImage: number,
        idProduct: number,
        url: string,
        idTenant: number,
        rank: number
      }
    ],
    attributes: [
      {
        idAttribute: number,
        idProduct: number,
        idAttributeName: number,
        idAttributeValue: number,
        name: string,
        value: string,
        attributeType: string,
        idTenant: number
      }
    ],
    warranty: number,
    productURL: string,
    sourcePrices: {
      priceBase: number,
      priceSale: number,
      isOutdated: boolean
    },    
    destinationPrices: {
      priceBase: number
      priceSale: number
      isOutdated: boolean
    },
    stocks: {
      sourceStock: number,
      virtualStock: number,
      isOutdated: true,
      handlingTime: number
    },
    idProductType: 0,
    metaData: {
      createDate: "2021-12-11T01:55:35.528Z",
      updateDate: "2021-12-11T01:55:35.528Z",
      updateAction: string,
      updateIdUser: string,
      updateUserName: string,
      idProductLoad: number,
      idProductAction: number
    }
}

export const productExample = {
    "sku": "testeWithTemplate2",
    "parentSKU": "",
    "ean13": "6669996669990",
    "warrantyMonths": 30,
    "handlingTime": 2,
    "stock": "7",
    "weightKg": "5.2",
    "url": "http://testes.com",
    "sourceId": "999",
    "categoryCode": "123",
    "name": "product testeWithTemplate2 teste 84",
    "sourceDescription": "product testeWithTemplate2 Base desc",
    "description": "product testeWithTemplate2",
    "brand": "marca teste",
    "videoURL": "http://videourl.com",
    "ncm": "",
    "idProductType": 1,
    "idTypeCondition": 1,
    "shippingType": "me1;me2",
    "height_m": "1",
    "width_m": "0.1",
    "length_m": "1",
    "priceBase": "357.64",
    "priceSale": "357.64",
    "images": [
        {
            "url": "http://www.images.com/teste"
        }, {
            "url": "http://www.images.com/2/teste"
        }
    ],
    "specifications": [
        {
            "name": "Garantia",
            "value": "30 dias",
            "type": 2
        }, {
            "name": "Especificações",
            "value": "é teste!",
            "type": 2
        }
    ]
}
