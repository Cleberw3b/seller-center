import { COLORS } from "./color"
import { FLAVORS } from "./flavors"
import { SIZES_ALIMENTOS_BEBIDAS, SIZES_BEACHWEAR, SIZES_BEATY, SIZES_CALCADOS, SIZES_DEFAULT, SIZES_FITNESS, SIZES_HOME, SIZES_PET } from "./size"

export interface Category {
    _id?: any,
    code: number,
    value: string,
    attributes: {
        sizes?: string[],
        colors?: string[],
        flavors?: string[],
        gluten_free?: [true, false],
        lactose_free?: [true, false],
        voltages?: ['110', '220', 'bivolt']
    }
}

export interface SubCategory {
    _id?: any,
    categoryCode: number
    code: number,
    value: string,
}

export const CATEGORIES: Category[] = [
    {
        code: 281,
        value: "Acessórios",
        attributes: {
            sizes: SIZES_DEFAULT,
            colors: COLORS
        }
    },
    {
        code: 282,
        value: "Beachwear",
        attributes: {
            sizes: SIZES_BEACHWEAR,
            colors: COLORS
        }
    },
    {
        code: 283,
        value: "Calçados",
        attributes: {
            sizes: SIZES_CALCADOS,
            colors: COLORS
        }
    },
    {
        code: 284,
        value: "Underwear",
        attributes: {
            sizes: SIZES_DEFAULT,
            colors: COLORS
        }
    },
    {
        code: 285,
        value: "Fitness",
        attributes: {
            sizes: SIZES_FITNESS,
            colors: COLORS
        }
    },
    {
        code: 286,
        value: "Roupas",
        attributes: {
            sizes: SIZES_DEFAULT,
            colors: COLORS
        }
    },
    {
        code: 288,
        value: "Home",
        attributes: {
            sizes: SIZES_HOME,
            colors: COLORS
        }
    },
    {
        code: 289,
        value: "Beauty",
        attributes: {
            sizes: SIZES_BEATY,
            colors: COLORS
        }
    },
    {
        code: 407,
        value: "Kids/Teen",
        attributes: {
            sizes: SIZES_DEFAULT,
            colors: COLORS
        }
    },
    {
        code: 426,
        value: "Joias",
        attributes: {
            sizes: SIZES_DEFAULT,
            colors: COLORS
        }
    },
    {
        code: 449,
        value: "Moda Pet",
        attributes: {
            sizes: SIZES_PET,
            colors: COLORS
        }
    },
    {
        code: 450,
        value: "Alimentos e Bebidas",
        attributes: {
            sizes: SIZES_ALIMENTOS_BEBIDAS,
            flavors: FLAVORS,
            gluten_free: [true, false],
            lactose_free: [true, false],
        }
    }
]

export const subcategories_accessory: SubCategory[] = [
    {
        categoryCode: 281,
        code: 290,
        value: "Acessórios de Cabelo "
    },
    {
        categoryCode: 281,
        code: 435,
        value: "Bijoux"
    },
    {
        categoryCode: 281,
        code: 292,
        value: "Bolsas"
    },
    {
        categoryCode: 281,
        code: 441,
        value: "Carteiras"
    },
    {
        categoryCode: 281,
        code: 294,
        value: "Chapéus"
    },
    {
        categoryCode: 281,
        code: 295,
        value: "Cintos"
    },
    {
        categoryCode: 281,
        code: 411,
        value: "Eletrônicos"
    },
    {
        categoryCode: 281,
        code: 297,
        value: "Lenços"
    },
    {
        categoryCode: 281,
        code: 410,
        value: "Malas e Mochilas"
    },
    {
        categoryCode: 281,
        code: 398,
        value: "Necessaires"
    },
    {
        categoryCode: 281,
        code: 298,
        value: "Óculos"
    },
    {
        categoryCode: 281,
        code: 397,
        value: "Relógios"
    }
]

export const subcategories_beachwear: SubCategory[] = [
    {
        categoryCode: 282,
        code: 303,
        value: "Acessórios"
    },
    {
        categoryCode: 282,
        code: 300,
        value: "Biquinis"
    },
    {
        categoryCode: 282,
        code: 301,
        value: "Maiôs"
    },
    {
        categoryCode: 282,
        code: 302,
        value: "Saídas"
    },
]

export const subcategories_calcados: SubCategory[] = [
    {
        categoryCode: 283,
        code: 402,
        value: "Anabelas"
    },
    {
        categoryCode: 283,
        code: 304,
        value: "Botas"
    },
    {
        categoryCode: 283,
        code: 287,
        value: "Chinelos"
    },
    {
        categoryCode: 283,
        code: 328,
        value: "Espadrille"
    },
    {
        categoryCode: 283,
        code: 329,
        value: "Mocassim"
    },
    {
        categoryCode: 283,
        code: 330,
        value: "Mule"
    },
    {
        categoryCode: 283,
        code: 331,
        value: "Plataforma"
    },
    {
        categoryCode: 283,
        code: 332,
        value: "Rasteira"
    },
    {
        categoryCode: 283,
        code: 393,
        value: "Salto"
    },
    {
        categoryCode: 283,
        code: 403,
        value: "Sandálias"
    },
    {
        categoryCode: 283,
        code: 401,
        value: "Sapatênis"
    },
    {
        categoryCode: 283,
        code: 394,
        value: "Sapatilhas"
    },
    {
        categoryCode: 283,
        code: 400,
        value: "Sapatos"
    },
    {
        categoryCode: 283,
        code: 395,
        value: "Tênis"
    },
]

export const subcategories_underwear: SubCategory[] = [
    {
        categoryCode: 284,
        code: 305,
        value: "Body"
    },
    {
        categoryCode: 284,
        code: 306,
        value: "Sleepwear"
    },
    {
        categoryCode: 284,
        code: 408,
        value: "Sutian"
    },
]

export const subcategories_fitness: SubCategory[] = [
    {
        categoryCode: 285,
        code: 307,
        value: "Acessórios"
    },
    {
        categoryCode: 285,
        code: 308,
        value: "Blusas"
    },
    {
        categoryCode: 285,
        code: 309,
        value: "Calças"
    },
    {
        categoryCode: 285,
        code: 310,
        value: "Casacos"
    },
    {
        categoryCode: 285,
        code: 311,
        value: "Shorts"
    },
    {
        categoryCode: 285,
        code: 312,
        value: "Top"
    },
]

export const subcategories_roupas: SubCategory[] = [
    {
        categoryCode: 286,
        code: 405,
        value: "Bermudas"
    },
    {
        categoryCode: 286,
        code: 313,
        value: "Blazers"
    },
    {
        categoryCode: 286,
        code: 314,
        value: "Blusas"
    },
    {
        categoryCode: 286,
        code: 315,
        value: "Body"
    },
    {
        categoryCode: 286,
        code: 316,
        value: "Calças"
    },
    {
        categoryCode: 286,
        code: 317,
        value: "Camisas"
    },
    {
        categoryCode: 286,
        code: 404,
        value: "Camisetas"
    },
    {
        categoryCode: 286,
        code: 318,
        value: "Casacos"
    },
    {
        categoryCode: 286,
        code: 319,
        value: "Coletes"
    },
    {
        categoryCode: 286,
        code: 320,
        value: "Conjuntos"
    },
    {
        categoryCode: 286,
        code: 321,
        value: "Cropped"
    },
    {
        categoryCode: 286,
        code: 322,
        value: "Jaquetas"
    },
    {
        categoryCode: 286,
        code: 323,
        value: "Macacões"
    },
    {
        categoryCode: 286,
        code: 324,
        value: "Moletom"
    },
    {
        categoryCode: 286,
        code: 325,
        value: "Saias"
    },
    {
        categoryCode: 286,
        code: 326,
        value: "Shorts"
    },
    {
        categoryCode: 286,
        code: 406,
        value: "Sobretudos"
    },
    {
        categoryCode: 286,
        code: 327,
        value: "Vestidos"
    },
]

export const subcategories_home: SubCategory[] = [
    {
        categoryCode: 288,
        code: 333,
        value: "Decoração"
    },
    {
        categoryCode: 288,
        code: 334,
        value: "Aromatizadores"
    },
    {
        categoryCode: 288,
        code: 445,
        value: "Velas"
    },
    {
        categoryCode: 288,
        code: 500,
        value: "Almofadas e Capas"
    },
    {
        categoryCode: 288,
        code: 501,
        value: "Vasos e cestas"
    },
    {
        categoryCode: 288,
        code: 502,
        value: "Organizadores e caixas"
    },
    {
        categoryCode: 288,
        code: 503,
        value: "Quadros e molduras"
    },
    {
        categoryCode: 288,
        code: 504,
        value: "Jogo de cama"
    },
    {
        categoryCode: 288,
        code: 505,
        value: "Copos, canecas e garrafas"
    },
    {
        categoryCode: 288,
        code: 506,
        value: "Prato, xícara e bowls"
    },
    {
        categoryCode: 288,
        code: 507,
        value: "Jogos americanos"
    },
    {
        categoryCode: 288,
        code: 508,
        value: "Bandejas"
    },
    {
        categoryCode: 288,
        code: 509,
        value: "Pano de prato e aventais"
    },
    {
        categoryCode: 288,
        code: 510,
        value: "Papelaria"
    },
]

export const subcategories_beauty: SubCategory[] = [
    {
        categoryCode: 289,
        code: 337,
        value: "Cabelos"
    },
    {
        categoryCode: 289,
        code: 442,
        value: "Makeup"
    },
    {
        categoryCode: 289,
        code: 336,
        value: "Perfumaria"
    },
    {
        categoryCode: 289,
        code: 335,
        value: "Skincare"
    },
    {
        categoryCode: 289,
        code: 444,
        value: "Bem estar e saúde"
    },
    {
        categoryCode: 289,
        code: 511,
        value: "Serum"
    },
    {
        categoryCode: 289,
        code: 512,
        value: "Demaquilante"
    },
    {
        categoryCode: 289,
        code: 513,
        value: "Hidratante"
    },
    {
        categoryCode: 289,
        code: 514,
        value: "Limpeza"
    },
    {
        categoryCode: 289,
        code: 515,
        value: "Esfoliante"
    },
    {
        categoryCode: 289,
        code: 516,
        value: "Máscara"
    },
    {
        categoryCode: 289,
        code: 517,
        value: "Proteção Solar"
    },
    {
        categoryCode: 289,
        code: 518,
        value: "Água Termal"
    },
    {
        categoryCode: 289,
        code: 519,
        value: "Blend"
    },
    {
        categoryCode: 289,
        code: 520,
        value: "Sabonete Liquido"
    },
    {
        categoryCode: 289,
        code: 521,
        value: "Desodorante"
    },
    {
        categoryCode: 289,
        code: 522,
        value: "Repelente"
    },
    {
        categoryCode: 289,
        code: 523,
        value: "Cuidados Íntimos"
    },
    {
        categoryCode: 289,
        code: 524,
        value: "Óleos Corporais"
    },
    {
        categoryCode: 289,
        code: 525,
        value: "Kits"
    },
    {
        categoryCode: 289,
        code: 526,
        value: "Unhas"
    },
]

export const subcategories_kids_teen: SubCategory[] = [
    // {
    //     categoryCode: 407,
    //     code: 1,
    //     value: ""
    // },
]

export const subcategories_joias: SubCategory[] = [
    {
        categoryCode: 426,
        code: 291,
        value: "Anéis"
    },
    {
        categoryCode: 426,
        code: 293,
        value: "Brincos"
    },
    {
        categoryCode: 426,
        code: 296,
        value: "Colares"
    },
    {
        categoryCode: 426,
        code: 399,
        value: "Pingentes"
    },
    {
        categoryCode: 426,
        code: 299,
        value: "Pulseiras"
    },
]

export const subcategories_moda_pet: SubCategory[] = [
    {
        categoryCode: 449,
        code: 527,
        value: "Guia, Coleira e Peitoral"
    },
    {
        categoryCode: 449,
        code: 528,
        value: "Brinquedos"
    },
    {
        categoryCode: 449,
        code: 529,
        value: "Camas"
    },
    {
        categoryCode: 449,
        code: 530,
        value: "Higiene"
    },
    {
        categoryCode: 449,
        code: 531,
        value: "Roupas"
    },
    {
        categoryCode: 449,
        code: 532,
        value: "Comer e Beber"
    },
]

export const subcategories_alimentos_bebidas: SubCategory[] = [
    {
        categoryCode: 450,
        code: 533,
        value: "Vinho"
    },
    {
        categoryCode: 450,
        code: 534,
        value: "Chá"
    },
    {
        categoryCode: 450,
        code: 535,
        value: "Matcha"
    },
    {
        categoryCode: 450,
        code: 536,
        value: "Proteína"
    },
    {
        categoryCode: 450,
        code: 537,
        value: "Pré Treino"
    },
    {
        categoryCode: 450,
        code: 538,
        value: "Complexos e multivitamínicos"
    },
    {
        categoryCode: 450,
        code: 539,
        value: "Estética"
    },
    {
        categoryCode: 450,
        code: 540,
        value: "Superblend"
    },
    {
        categoryCode: 450,
        code: 541,
        value: "Fibras e enzimas"
    },
    {
        categoryCode: 450,
        code: 542,
        value: "Aminoácidos"
    },
    {
        categoryCode: 450,
        code: 543,
        value: "Performance"
    },
    {
        categoryCode: 450,
        code: 544,
        value: "Probióticos e Prébioticos"
    },
    {
        categoryCode: 450,
        code: 545,
        value: "Vitaminas e Minerais"
    },
    {
        categoryCode: 450,
        code: 546,
        value: "Farinhas"
    },
    {
        categoryCode: 450,
        code: 547,
        value: "Grãos"
    },
    {
        categoryCode: 450,
        code: 548,
        value: "Sais"
    },
    {
        categoryCode: 450,
        code: 549,
        value: "Granolas"
    },
    {
        categoryCode: 450,
        code: 550,
        value: "Frutas, geleias, mix"
    },
    {
        categoryCode: 450,
        code: 551,
        value: "Encapsulados"
    },
    {
        categoryCode: 450,
        code: 552,
        value: "Café"
    },
    {
        categoryCode: 450,
        code: 553,
        value: "Doces e chocolates"
    },
    {
        categoryCode: 450,
        code: 554,
        value: "Snacks e barras"
    },
    {
        categoryCode: 450,
        code: 555,
        value: "Proteína Vegetal"
    },
    {
        categoryCode: 450,
        code: 556,
        value: "Colágeno"
    },
    {
        categoryCode: 450,
        code: 557,
        value: "Superfood"
    },
]

export const SUBCATEGORIES: SubCategory[] = [
    ...subcategories_accessory,
    ...subcategories_beachwear,
    ...subcategories_calcados,
    ...subcategories_underwear,
    ...subcategories_fitness,
    ...subcategories_roupas,
    ...subcategories_home,
    ...subcategories_beauty,
    ...subcategories_kids_teen,
    ...subcategories_joias,
    ...subcategories_moda_pet,
    ...subcategories_alimentos_bebidas,
]
