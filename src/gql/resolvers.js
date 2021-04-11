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
} = require('../controllers/user');

const resolvers = {
  Query: {
    getAllUsers: async () => {
      const users = await getAllUsersController();
      return users;
    },
    getUser: (_, {}, context) => {
      return context;
    },

    // Product ********************************************
    getAllProducts: async () => {
      const products = await getAllProductsController();
      return products;
    },
    getProduct: async (_, { id }) => {
      const product = await getProductController(id);
      if (!product.ok) throw new Error(product.err);
      return product.product;
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
      if (!client.ok) throw new Error(client.err);
      return client.client;
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
      if (!user.ok) throw new Error(user.err);
      return user.user;
    },
    loginUser: async (_, { input }) => {
      const token = await loginUserController(input);
      if (!token.ok) throw new Error(token.err);
      return { token: token.token };
    },

    // Product ********************************************
    createProduct: async (_, { input }) => {
      const product = await createProductController(input);
      if (!product.ok) throw new Error(product.err);
      return product.product;
    },
    updateProduct: async (_, { input }) => {
      const product = await updateProductController(input);
      if (!product.ok) throw new Error(product.err);
      return product.product;
    },
    deleteProduct: async (_, { id }) => {
      const product = await deleteProductController(id);
      if (!product.ok) throw new Error(product.err);
      return product.product;
    },

    // Client *********************************************
    createClient: async (_, { input }, context) => {
      const client = await createClientController(input, context);
      if (!client.ok) throw new Error(client.err);
      return client.client;
    },
    updateClient: async (_, { id, input }, context) => {
      const client = await updateClientController(id, input, context);
      if (!client.ok) throw new Error(client.err);
      return client.client;
    },
    deleteClient: async (_, { id }, context) => {
      const message = await deleteClientController(id, context);
      if (!message.ok) throw new Error(message.err);
      return message.res;
    },

    // Order **********************************************
    createOrder: async (_, { input }, context) => {
      const order = await createOrderController(input, context);
      if (!order.ok) throw new Error(order.err);
      return order.order;
    },
    updateOrder: async (_, { id, input }, context) => {
      const order = await updateOrderController(id, input, context);
      if (!order.ok) throw new Error(order.err);
      return order.order;
    },
    deleteOrder: async (_, { id }, context) => {
      const message = await deleteOrderController(id, context);
      if (!message.ok) throw new Error(message.err);
      return message.msg;
    },
  },
};

module.exports = resolvers;
