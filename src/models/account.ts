
export interface Address {
    _id?: any,
    userId: any,
    cep: string,
    address: string,
    number: string,
    complement: string,
    district: string,
    city: string
}

export interface Contact {
    _id?: any,
    telphone: string,
    whatsapp: string
}

export interface BankInfo {
    _id?: any,
    userId: any,
    account: string,
    agency: string,
    bank: string
}

export interface ShopInfo {
    _id?: any,
    userId: any,
    cnpj: string,
    name: string
}

export interface PersonalInfo {
    _id?: any,
    userId: any,
    firstName: string,
    lastName: string,
    cpf: string,
    rg: string,
    birthday: number
}

export interface Account {
    personalInfo: PersonalInfo | null,
    address: Address | null,
    shopInfo: ShopInfo | null,
    bankInfo: BankInfo | null
}
