
export interface Bank {
    value: string,
    name: string
}

export const isBankCodeValid = ( bankCode: string ) => {
    return BANKS.some( bank => bank.value === bankCode )
}

export const BANKS: Bank[] = [
    {
        value: "001",
        name: "Banco do Brasil"
    },
    {
        value: "003",
        name: "Banco da Amazônia"
    },
    {
        value: "004",
        name: "Banco do Nordeste"
    },
    {
        value: "021",
        name: "Banestes"
    },
    {
        value: "025",
        name: "Banco Alfa"
    },
    {
        value: "027",
        name: "Besc"
    },
    {
        value: "029",
        name: "Banerj"
    },
    {
        value: "031",
        name: "Banco Beg"
    },
    {
        value: "033",
        name: "Banco Santander Banespa"
    },
    {
        value: "036",
        name: "Banco Bem"
    },
    {
        value: "037",
        name: "Banpará"
    },
    {
        value: "038",
        name: "Banestado"
    },
    {
        value: "039",
        name: "BEP"
    },
    {
        value: "040",
        name: "Banco Cargill"
    },
    {
        value: "041",
        name: "Banrisul"
    },
    {
        value: "044",
        name: "BVA"
    },
    {
        value: "045",
        name: "Banco Opportunity"
    },
    {
        value: "047",
        name: "Banese"
    },
    {
        value: "062",
        name: "Hipercard"
    },
    {
        value: "063",
        name: "Ibibank"
    },
    {
        value: "065",
        name: "Lemon Bank"
    },
    {
        value: "066",
        name: "Banco Morgan Stanley Dean Witter"
    },
    {
        value: "069",
        name: "BPN Brasil"
    },
    {
        value: "070",
        name: "Banco de Brasília – BRB"
    },
    {
        value: "072",
        name: "Banco Rural"
    },
    {
        value: "073",
        name: "Banco Popular"
    },
    {
        value: "074",
        name: "Banco J. Safra"
    },
    {
        value: "075",
        name: "Banco CR2"
    },
    {
        value: "076",
        name: "Banco KDB"
    },
    {
        value: "077",
        name: "Banco Inter"
    },
    {
        value: "096",
        name: "Banco BMF"
    },
    {
        value: "104",
        name: "Caixa Econômica Federal"
    },
    {
        value: "107",
        name: "Banco BBM"
    },
    {
        value: "116",
        name: "Banco Único"
    },
    {
        value: "151",
        name: "Nossa Caixa"
    },
    {
        value: "175",
        name: "Banco Finasa"
    },
    {
        value: "184",
        name: "Banco Itaú BBA"
    },
    {
        value: "204",
        name: "American Express Bank"
    },
    {
        value: "208",
        name: "Banco Pactual"
    },
    {
        value: "212",
        name: "Banco Matone"
    },
    {
        value: "213",
        name: "Banco Arbi"
    },
    {
        value: "214",
        name: "Banco Dibens"
    },
    {
        value: "217",
        name: "Banco Joh Deere"
    },
    {
        value: "218",
        name: "Banco Bonsucesso"
    },
    {
        value: "222",
        name: "Banco Calyon Brasil"
    },
    {
        value: "224",
        name: "Banco Fibra"
    },
    {
        value: "225",
        name: "Banco Brascan"
    },
    {
        value: "229",
        name: "Banco Cruzeiro"
    },
    {
        value: "230",
        name: "Unicard"
    },
    {
        value: "233",
        name: "Banco GE Capital"
    },
    {
        value: "237",
        name: "Bradesco"
    },
    {
        value: "237",
        name: "Next"
    },
    {
        value: "241",
        name: "Banco Clássico"
    },
    {
        value: "243",
        name: "Banco Stock Máxima"
    },
    {
        value: "246",
        name: "Banco ABC Brasil"
    },
    {
        value: "248",
        name: "Banco Boavista Interatlântico"
    },
    {
        value: "249",
        name: "Investcred Unibanco"
    },
    {
        value: "250",
        name: "Banco Schahin"
    },
    {
        value: "252",
        name: "Fininvest"
    },
    {
        value: "254",
        name: "Paraná Banco"
    },
    {
        value: "263",
        name: "Banco Cacique"
    },
    {
        value: "260",
        name: "Nubank"
    },
    {
        value: "265",
        name: "Banco Fator"
    },
    {
        value: "266",
        name: "Banco Cédula"
    },
    {
        value: "300",
        name: "Banco de la Nación Argentina"
    },
    {
        value: "318",
        name: "Banco BMG"
    },
    {
        value: "320",
        name: "Banco Industrial e Comercial"
    },
    {
        value: "356",
        name: "ABN Amro Real"
    },
    {
        value: "341",
        name: "Itau"
    },
    {
        value: "347",
        name: "Sudameris"
    },
    {
        value: "351",
        name: "Banco Santander"
    },
    {
        value: "353",
        name: "Banco Santander Brasil"
    },
    {
        value: "366",
        name: "Banco Societe Generale Brasil"
    },
    {
        value: "370",
        name: "Banco WestLB"
    },
    {
        value: "376",
        name: "JP Morgan"
    },
    {
        value: "389",
        name: "Banco Mercantil do Brasil"
    },
    {
        value: "394",
        name: "Banco Mercantil de Crédito"
    },
    {
        value: "399",
        name: "HSBC"
    },
    {
        value: "409",
        name: "Unibanco"
    },
    {
        value: "412",
        name: "Banco Capital"
    },
    {
        value: "422",
        name: "Banco Safra"
    },
    {
        value: "453",
        name: "Banco Rural"
    },
    {
        value: "456",
        name: "Banco Tokyo Mitsubishi UFJ"
    },
    {
        value: "464",
        name: "Banco Sumitomo Mitsui Brasileiro"
    },
    {
        value: "477",
        name: "Citibank"
    },
    {
        value: "479",
        name: "Itaubank (antigo Bank Boston)"
    },
    {
        value: "487",
        name: "Deutsche Bank"
    },
    {
        value: "488",
        name: "Banco Morgan Guaranty"
    },
    {
        value: "492",
        name: "Banco NMB Postbank"
    },
    {
        value: "494",
        name: "Banco la República Oriental del Uruguay"
    },
    {
        value: "495",
        name: "Banco La Provincia de Buenos Aires"
    },
    {
        value: "505",
        name: "Banco Credit Suisse"
    },
    {
        value: "600",
        name: "Banco Luso Brasileiro"
    },
    {
        value: "604",
        name: "Banco Industrial"
    },
    {
        value: "610",
        name: "Banco VR"
    },
    {
        value: "611",
        name: "Banco Paulista"
    },
    {
        value: "612",
        name: "Banco Guanabara"
    },
    {
        value: "613",
        name: "Banco Pecunia"
    },
    {
        value: "623",
        name: "Banco Panamericano"
    },
    {
        value: "626",
        name: "Banco Ficsa"
    },
    {
        value: "630",
        name: "Banco Intercap"
    },
    {
        value: "633",
        name: "Banco Rendimento"
    },
    {
        value: "634",
        name: "Banco Triângulo"
    },
    {
        value: "637",
        name: "Banco Sofisa"
    },
    {
        value: "638",
        name: "Banco Prosper"
    },
    {
        value: "643",
        name: "Banco Pine"
    },
    {
        value: "652",
        name: "Itaú Holding Financeira"
    },
    {
        value: "653",
        name: "Banco Indusval"
    },
    {
        value: "654",
        name: "Banco A.J. Renner"
    },
    {
        value: "655",
        name: "Banco Votorantim"
    },
    {
        value: "707",
        name: "Banco Daycoval"
    },
    {
        value: "719",
        name: "Banif"
    },
    {
        value: "721",
        name: "Banco Credibel"
    },
    {
        value: "734",
        name: "Banco Gerdau"
    },
    {
        value: "735",
        name: "Banco Neon"
    },
    {
        value: "738",
        name: "Banco Morada"
    },
    {
        value: "739",
        name: "Banco Galvão de Negócios"
    },
    {
        value: "740",
        name: "Banco Barclays"
    },
    {
        value: "741",
        name: "BRP"
    },
    {
        value: "743",
        name: "Banco Semear"
    },
    {
        value: "745",
        name: "Banco Citibank"
    },
    {
        value: "746",
        name: "Banco Modal"
    },
    {
        value: "747",
        name: "Banco Rabobank International"
    },
    {
        value: "748",
        name: "Banco Cooperativo Sicredi"
    },
    {
        value: "749",
        name: "Banco Simples"
    },
    {
        value: "751",
        name: "Dresdner Bank"
    },
    {
        value: "752",
        name: "BNP Paribas"
    },
    {
        value: "753",
        name: "Banco Comercial Uruguai"
    },
    {
        value: "755",
        name: "Banco Merrill Lynch"
    },
    {
        value: "756",
        name: "Banco Cooperativo do Brasil"
    },
    {
        value: "757",
        name: "KEB"
    }
]
