const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  order: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    default: 'PENDING',
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Client',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model('Order', orderSchema);
