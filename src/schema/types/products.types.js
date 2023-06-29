const products = `#graphql

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
}

type price{
    value: priceValue
}

type priceValue {
    currencyCode: String
    centAmount: Int
}

type image{
    id: ID
    url: String 
    label: String
}

type Query {
products(page: Int): [product!]
}

`;

module.exports = [products];
