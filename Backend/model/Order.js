const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  price:{type:String,required:true},
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;