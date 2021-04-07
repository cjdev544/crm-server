const {
  getBestClientsController,
  getBestSellersController,
  searchProductController,
} = require('../controllers/advancedSearches');
const {
  createClientController,
  getClientController,
  getAllClientsController,
  getClientsBySellerController,
  updateClientController,
  deleteClientController,
} = require('../controllers/client');
const {
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrderByStatusController,
  getOrderController,
  getOrdersByUserController,
  updateOrderController,
} = require('../controllers/order');
const {
  createProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} = require('../controllers/product');
const {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserController,
} = require('../controllers/user');

const resolvers = {
  Query: {
    getAllUsers: async () => {
      const users = await getAllUsersController();
      return users;
    },
    getUser: async (_, { token }) => {
      const user = await getUserController(token);
      return user;
    },

    // Product ********************************************
    getAllProducts: async () => {
      const products = await getAllProductsController();
      return products;
    },
    getProduct: async (_, { id }) => {
      const product = await getProductController(id);
      return product;
    },

    // Client *********************************************
    getAllClients: async () => {
      const clients = await getAllClientsController();
      return clients;
    },
    getClientsBySeller: async (_, {}, context) => {
      const clients = await getClientsBySellerController(context);
      return clients;
    },
    getClient: async (_, { id }, context) => {
      const client = await getClientController(id, context);
      return client;
    },

    // Order **********************************************
    getAllOrders: async () => {
      const orders = await getAllOrdersController();
      return orders;
    },
    getOrdersByUser: async (_, {}, context) => {
      const orders = await getOrdersByUserController(context);
      return orders;
    },
    getOrder: async (_, { id }, context) => {
      const order = await getOrderController(id, context);
      return order;
    },
    getOrderByStatus: async (_, { status }, context) => {
      const orders = await getOrderByStatusController(status, context);
      return orders;
    },

    // Advanced searches **********************************
    getBestClients: async () => {
      const clients = await getBestClientsController();
      return clients;
    },
    getBestSellers: async () => {
      const sellers = await getBestSellersController();
      return sellers;
    },
    searchProducts: async (_, { text }) => {
      const products = await searchProductController(text);
      return products;
    },
  },

  Mutation: {
    // User ***********************************************
    createUser: async (_, { input }) => {
      const user = await createUserController(input);
      return user;
    },
    loginUser: async (_, { input }) => {
      const token = await loginUserController(input);
      return token;
    },

    // Product ********************************************
    createProduct: async (_, { input }) => {
      const product = await createProductController(input);
      return product;
    },
    updateProduct: async (_, { id, input }) => {
      const product = await updateProductController(id, input);
      return product;
    },
    deleteProduct: async (_, { id }) => {
      const message = await deleteProductController(id);
      return message;
    },

    // Client *********************************************
    createClient: async (_, { input }, context) => {
      const client = await createClientController(input, context);
      return client;
    },
    updateClient: async (_, { id, input }, context) => {
      const client = await updateClientController(id, input, context);
      return client;
    },
    deleteClient: async (_, { id }, context) => {
      const message = await deleteClientController(id, context);
      return message;
    },

    // Order **********************************************
    createOrder: async (_, { input }, context) => {
      const order = await createOrderController(input, context);
      return order;
    },
    updateOrder: async (_, { id, input }, context) => {
      const order = await updateOrderController(id, input, context);
      return order;
    },
    deleteOrder: async (_, { id }, context) => {
      const message = await deleteOrderController(id, context);
      return message;
    },
  },
};

module.exports = resolvers;
