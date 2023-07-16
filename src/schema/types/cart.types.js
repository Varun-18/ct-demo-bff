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
    addCustomerEmail(data: JSON) : JSON
    addShippingAddress(data: JSON): JSON
    addShippingMethod(data: JSON): JSON
    addBillingAddress(data: JSON): JSON
    addPaymentMethod(data: JSON): JSON
    convertCartToOrder(data: JSON): JSON
    }
`;

module.exports = [cart];
