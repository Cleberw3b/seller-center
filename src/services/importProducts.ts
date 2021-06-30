import { COLORS } from '../models/color'
import { getCategory, getSubCategory } from './categoryService'

const schema = {
    'ID': {
        prop: 'id',
        required: true,
        type: Number

    },
    'NACIONALIDADE': {
        prop: 'nationality',
        required: true,
        type: String,
        oneOf: [
            'NACIONAL',
            'INTERNACIONAL'
        ]
    },
    'CATEGORIA': {
        prop: 'category',
        required: true,
        type: async ( value: any ) => {
            const category = await getCategory( value )
            if ( !category ) throw new Error( 'Invalid Category' )
            return category
        }
    },
    'SUBCATEGORIA': {
        prop: 'subcategory',
        required: true,
        type: async ( value: any ) => {
            const subcategory = await getSubCategory( value )
            if ( !subcategory ) throw new Error( 'Invalid Subcategory' )
            return subcategory
        },
    },
    'NOME': {
        prop: 'name',
        required: true,
        type: String
    },
    'DESCRICAO': {
        prop: 'description',
        required: true,
        type: String
    },
    'MARCA': {
        prop: 'brand',
        required: true,
        type: String
    },
    'OUTROS DETALHES': {
        prop: 'more_info',
        required: true,
        type: String
    },
    'EAN': {
        prop: 'ean',
        required: true,
        type: String
    },
    'SKU': {
        prop: 'sku',
        required: true,
        type: String
    },
    'GENERO': {
        prop: 'gender',
        required: true,
        type: String,
        oneOf: ['M', 'F', 'U']
    },
    'ALTURA': {
        prop: 'height',
        required: true,
        type: Number
    },
    'LARGURA': {
        prop: 'width',
        required: true,
        type: Number
    },
    'PROFUNDIDADE': {
        prop: 'length',
        required: true,
        type: Number
    },
    'PESO': {
        prop: 'weight',
        required: true,
        type: Number
    },
    'PRECO': {
        prop: 'price',
        required: true,
        type: Number
    },
    'PRECO COM DESCONTO': {
        prop: 'price_discounted',
        required: true,
        type: Number
    },
    'TAMANHO': {
        prop: 'size',
        required: true,
        type: Number
    },
    'ESTOQUE': {
        prop: 'stock',
        required: true,
        type: Number
    },
    'COR': {
        prop: 'color',
        required: true,
        type: String,
        oneOf: COLORS
    },
    'IMAGEM 1': {
        prop: 'imagem1',
        required: true,
        type: URL
    },
    'IMAGEM 2': {
        prop: 'imagem2',
        required: true,
        type: URL
    },
    'IMAGEM 3': {
        prop: 'imagem3',
        type: URL
    },
    'IMAGEM 4': {
        prop: 'imagem4',
        type: URL
    },
    'IMAGEM 5': {
        prop: 'imagem5',
        type: URL
    },
}
