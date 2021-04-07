const updateOrderChange = require('../helpers/updateOrderChange');
const Client = require('../models/Client');
const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrderController = async (input, context) => {
  try {
    // Validated if clieent exist
    const client = await Client.findById(input.clientId);
    if (!client) throw new Error('Cliente no encontrado');
    // Validate client is the user
    if (client.sellerId.toString() !== context.id)
      throw new Error('El cliente pertenece a otro vendedor');
    // Validate product
    for await (const orderProduct of input.order) {
      // Validate product exist
      const product = await Product.findById(orderProduct.id);
      if (!product) throw new Error('Producto no encontrado');
      // Validate if there are products in stock
      if (orderProduct.amount <= 0)
        throw new Error('El pedido debe ser mayor a 0');
      if (orderProduct.amount > product.stock)
        throw new Error(
          `No se puede crear el pedido de '${product.name}'solo hay ${product.stock} en stock`
        );
    }
    // Subtract order from stock before saving
    for await (const orderProduct of input.order) {
      const product = await Product.findById(orderProduct.id);
      product.stock -= orderProduct.amount;
      await Product.findByIdAndUpdate(product.id, product, { new: true });
    }
    // Insert clientId and userId before saving
    const newOrder = new Order(input);
    newOrder.clientId = client.id;
    newOrder.userId = context.id;
    await newOrder.save();
    return newOrder;
  } catch (err) {
    console.log(err);
  }
};

const getAllOrdersController = async () => {
  try {
    const orders = await Order.find({});
    return orders;
  } catch (err) {
    console.log(err);
  }
};

const getOrdersByUserController = async (context) => {
  try {
    const order = await Order.find({ userId: context.id });
    return order;
  } catch (err) {
    console.log(err);
  }
};

const getOrderController = async (id, context) => {
  try {
    // Validate order exist
    const order = await Order.findById(id);
    if (!order) throw new Error('Pedido no encontrado');
    // Validates if order belongs to the active user
    if (order.userId.toString() !== context.id)
      throw new Error('Usuario no autorizado');
    return order;
  } catch (err) {
    console.log(err);
  }
};

const updateOrderController = async (id, input, context) => {
  try {
    // Validate order exist
    const order = await Order.findById(id);
    if (!order) throw new Error('Pedido no encontrado');
    // Validat client exist
    const client = await Client.findById(order.clientId);
    if (!client) throw new Error('Cliente no encontrado');
    // Validates if order belongs to the active user
    if (order.userId.toString() !== context.id)
      throw new Error('Usuario no autorizado');
    // Add or subtract according to the order change
    // helpers function
    updateOrderChange(input.order, order.order)
      .then(async () => {
        // Update order
        const updateOrder = await Order.findByIdAndUpdate(id, input, {
          new: true,
        });
        return updateOrder;
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

const deleteOrderController = async (id, context) => {
  try {
    // Validate order exist
    const order = await Order.findById(id);
    if (!order) throw new Error('Pedido no encontrado');
    // Validat client exist
    const client = await Client.findById(order.clientId);
    if (!client) throw new Error('Cliente no encontrado');
    // Validates if order belongs to the active user
    if (order.userId.toString() !== context.id)
      throw new Error('Usuario no autorizado');
    await Order.findByIdAndRemove(id);
    return 'Pedido eliminado';
  } catch (err) {
    console.log(err);
  }
};

const getOrderByStatusController = async (status, context) => {
  try {
    const orders = await Order.find({ status, userId: context.id });
    return orders;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createOrderController,
  getAllOrdersController,
  getOrdersByUserController,
  getOrderController,
  updateOrderController,
  deleteOrderController,
  getOrderByStatusController,
};
