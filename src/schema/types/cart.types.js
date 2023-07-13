const cart = `#graphql
    scalar JSON

    type lineItems {
        id: ID
        productId: ID
        name: Name
    }

    type Name{
    en: String 
    }

    type Query {
        getLineItems (cartID: ID): [lineItems]
    }

    type Mutation {    
    addToCart(data: JSON) : JSON

    }
`;

module.exports = [cart];
