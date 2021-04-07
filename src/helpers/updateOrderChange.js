const Product = require('../models/Product');

// Subtract order from stock before saving
const substractOrderProduct = async (order) => {
  for await (const orderProduct of order) {
    // new order
    const product = await Product.findById(orderProduct.id);
    product.stock -= orderProduct.amount;
    await Product.findByIdAndUpdate(product.id, product);
  }
};

const updateOrderChange = async (newOrder, oldOrder) => {
  // Delete old order in Product Stock
  for await (const product of oldOrder) {
    const productDelete = await Product.findById(product.id);
    if (!productDelete)
      throw new Error(`Producto: '${product.name}' no encontrado`);
    productDelete.stock += product.amount;
    await Product.findByIdAndUpdate(productDelete.id, productDelete);
  }

  // Substract new order in product stock
  for await (const orderProduct of newOrder) {
    // Validate product exist
    const product = await Product.findById(orderProduct.id);
    if (!product) throw new Error(`Producto: '${product.name}' no encontrado`);
    // Validate if there are products in stock
    if (orderProduct.amount <= 0) {
      // return of the old Order
      substractOrderProduct(oldOrder);
      throw new Error('El pedido debe ser mayor a 0');
    }
    if (orderProduct.amount > product.stock) {
      // return of the old Order
      substractOrderProduct(oldOrder);
      throw new Error(
        `No se puede crear el pedido de '${product.name}' no hay suficientes en stock`
      );
    }
  }
  // Update stock whith new order
  substractOrderProduct(newOrder);
};

module.exports = updateOrderChange;
