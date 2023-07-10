const user = `#graphql

scalar JSON

type Mutation  {
    checkUser(data: JSON): JSON
    addUser(data: JSON): JSON 
    addSocialsUser(data: JSON): JSON 
    loginUser(data: JSON): JSON
} 
`;

module.exports = [user];
