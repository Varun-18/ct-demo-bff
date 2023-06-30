const products = `#graphql

scalar JSON

type product{
    id: ID
    name: locale
    description: locale
    slug: locale
    masterVariant: masterVariant
}



type locale{
    en: String 
}

type masterVariant{
    id: ID
    sku: String
    prices: [ price ]
    images: [ image ]
    attributes: [attributeValue]
}



type attributeValue {
    name: String
    value: JSON
}


type value1{
    key: String
    label: String
}

type price{
    value: priceValue
}

type priceValue {
    currencyCode: String
    centAmount: Int
    fractionDigits: Int
}

type image{
    id: ID
    url: String 
    label: String
}

type Query {
    products(page: Int): [product!]
    product(id: ID) : product
}

`;

module.exports = [products];
