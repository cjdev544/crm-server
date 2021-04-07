const Order = require('../models/Order');
const Product = require('../models/Product');

const getBestClientsController = async () => {
  try {
    const clients = await Order.aggregate([
      { $match: { status: 'SUCCESS' } },
      {
        $group: {
          _id: '$clientId',
          totalBuy: { $sum: '$total' },
        },
      },
      {
        $lookup: {
          from: 'clients',
          localField: '_id',
          foreignField: '_id',
          as: 'client',
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]);
    return clients;
  } catch (err) {
    console.log(err);
  }
};

const getBestSellersController = async () => {
  try {
    const sellers = await Order.aggregate([
      { $match: { status: 'SUCCESS' } },
      {
        $group: {
          _id: '$userId',
          totalSell: { $sum: '$total' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'seller',
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]);
    return sellers;
  } catch (err) {
    console.log(err);
  }
};

const searchProductController = async (text) => {
  const products = await Product.find({ $text: { $search: text } });
  return products;
};

module.exports = {
  getBestClientsController,
  getBestSellersController,
  searchProductController,
};
