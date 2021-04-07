const { gql } = require('apollo-server');

const typeDefs = gql`
  # types User ********************************************
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    createAt: String
  }

  type Token {
    token: String
  }

  # types Product *****************************************
  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    createAt: String
  }

  # types Client ******************************************
  type Client {
    id: ID
    name: String
    lastName: String
    company: String
    phone: String
    email: String
    createAt: String
    sellerId: ID
  }

  # Order *************************************************
  type OrderProduct {
    id: ID!
    amount: Int
  }

  enum OrderStatus {
    PENDING
    SUCCESS
    CANCEL
  }

  type Order {
    id: ID
    order: [OrderProduct]
    total: Float
    status: OrderStatus
    createAt: String
    clientId: ID
    userId: ID
  }

  # Advanced searches *************************************
  type TopClient {
    totalBuy: Float
    client: [Client]
  }

  type TopSeller {
    totalSell: Float
    seller: [User]
  }

  # Inputs ################################################
  # inputs User ********************************************
  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  # inputs Product ****************************************
  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  # inputs Client *****************************************
  input ClientInput {
    name: String!
    lastName: String!
    company: String!
    phone: String
    email: String!
  }

  # inputs Order ******************************************
  input OrderProductInput {
    id: ID!
    amount: Int!
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float!
    status: OrderStatus
    clientId: ID!
  }

  type Query {
    getAllUsers: [User]
    getUser(token: String!): User

    # Product
    getAllProducts: [Product]
    getProduct(id: String!): Product

    # Client
    getAllClients: [Client]
    getClientsBySeller: [Client]
    getClient(id: ID!): Client

    # Order
    getAllOrders: [Order]
    getOrdersByUser: [Order]
    getOrder(id: ID!): Order
    getOrderByStatus(status: String!): [Order]

    # Advanced searches
    getBestClients: [TopClient]
    getBestSellers: [TopSeller]
    searchProducts(text: String!): [Product]
  }

  type Mutation {
    # User
    createUser(input: UserInput): User
    loginUser(input: LoginInput): Token

    # Product
    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String

    # Client
    createClient(input: ClientInput): Client
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID!): String

    # Order
    createOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): String
  }
`;

module.exports = typeDefs;
