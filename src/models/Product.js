const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', productSchema);
