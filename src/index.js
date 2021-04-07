const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers');
const dbConection = require('./database/config');

require('dotenv').config();

// Create Server
const server = () => {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers['crm-token'] || '';
      // Validate token
      if (token) {
        try {
          const data = jwt.verify(token, process.env.PRIVATE_KEY);
          return { ...data };
        } catch (err) {
          console.log(err);
        }
      }
    },
  });

  serverApollo
    .listen()
    .then(({ url }) => {
      console.log('#############################################');
      console.log(`🚀  Server ready at ${url}`);
    })
    .catch((err) => console.error(err));
};

// Run Database
dbConection();

// Run Server
server();
