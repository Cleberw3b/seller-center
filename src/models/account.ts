
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
    userId: any,
    phone: string,
    whatsapp?: string,
    url?: string
}

export interface BankInfo {
    _id?: any,
    userId: any,
    account: string,
    agency: string,
    bank: string,
    name: string,
    pix: string
}

export interface ShopInfo {
    _id?: any,
    userId: any,
    name: string
}

export interface PessoaFisica {
    _id?: any,
    userId: any,
    firstName: string,
    lastName: string,
    cpf: string,
    birthday: number
}

export interface PessoaJuridica {
    _id?: any,
    userId: any,
    cnpj: string,
    name: string,
    razaoSocial: string,
    inscricaoEstadual: string,
    inscricaoMunicipal: string,
}

export type PersonalInfo = PessoaFisica | PessoaJuridica

export interface Questions {
    howDidYoulearnAboutUs: string,
}
export interface UserStatus {
    _id?: any,
    userId: any,
    agreeOnTermsOfUse: boolean,
    is360: boolean,
}

export interface Account {
    personalInfo: PersonalInfo | null,
    address: Address | null,
    shopInfo: ShopInfo | null,
    bankInfo: BankInfo | null,
    contact: Contact | null,
}
