"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const user = apollo_server_express_1.gql `
type User {
  id:ID!
  fullName:String!
  email:String!,
  password:String!
}
 type Query {
    users:[User!]!
    userId(id:ID):User!
    login(input:loginInput!):AuthData!
  }
  input userInput {
    fullName:String!
  email:String!,
  password:String!
  }
  input loginInput {
  email:String!,
  password:String!
  }
  type AuthData {
    token: String! 
  }
type Mutation { 
    register(input:userInput!):AuthData!
   
  }
 
`;
exports.default = user;
//# sourceMappingURL=shema.js.map