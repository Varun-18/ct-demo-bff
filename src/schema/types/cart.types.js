const cart = `#graphql
    scalar JSON

    type Cart { 
    id: ID
    version: Int
    lineItems: [Lineitem]
    totalPrice: priceValue
    taxedPrice: taxedPrice
    shippingAddress: JSON
    shippingInfo: JSON
    billingAddress: JSON
    customerEmail: JSON
    }

    type Lineitem {
        id: ID
        productId: ID
        name: locale
        variant: masterVariant
        price: [price]
        quantity: Int
        totalPrice:priceValue 
    }

    type taxedPrice {
        totalTax: priceValue
        totalNet: priceValue
    }


    type Query {
        getCart (cartID: ID): Cart 
    }

    type Mutation {    
    addToCart(data: JSON) : JSON
    addCustomerEmail(data: JSON) : JSON
    verifyCustomerEmail(data: JSON) : JSON
    addShippingAddress(data: JSON): JSON
    addShippingMethod(data: JSON): JSON
    addBillingAddress(data: JSON): JSON
    addPaymentMethod(data: JSON): JSON
    convertCartToOrder(data: JSON): JSON
    removeLineItem(data: JSON): JSON
    }
`;

module.exports = [cart];
