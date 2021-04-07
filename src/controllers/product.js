const Product = require('../models/Product');

const createProductController = async (input) => {
  try {
    // Validate if product exists
    const productExist = await Product.findOne({ name: input.name });
    if (productExist)
      throw new Error(`Ya existe un producto con el nombre '${input.name}'`);
    // Save product in Database
    const product = new Product(input);
    await product.save();
    return product;
  } catch (err) {
    console.log(err);
  }
};

const getAllProductsController = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (err) {
    console.log(err);
  }
};

const getProductController = async (id) => {
  try {
    // Validate if product exists
    const product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
  } catch (err) {
    console.log(err);
  }
};

const updateProductController = async (id, input) => {
  try {
    // Validate if product exists
    const product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');
    // Update product
    const newProduct = await Product.findByIdAndUpdate(id, input, {
      new: true,
    });
    return newProduct;
  } catch (err) {
    console.log(err);
  }
};

const deleteProductController = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');
    await Product.findByIdAndRemove(id);
    return 'Producto eliminado';
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
};
