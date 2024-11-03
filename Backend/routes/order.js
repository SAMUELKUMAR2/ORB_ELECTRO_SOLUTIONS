const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const Payment = require('../model/Payment')
const isLoggedIn = require('../middleware.js')


// Get all orders(Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order (Client)
router.post('/:id',isLoggedIn, async (req, res) => {

  const {customerName,paymentId,customerNumber,quantity,address,productName,price,totalPrice,paymentMethod} =req.body;
  
  
  try {
    const order = new Order({
      customerName:customerName,
      customerPhone:customerNumber,
      productName:productName,
      address:address,
      quantity:quantity,
      price:price,
      totalAmount:totalPrice,
    });
    const newOrder = await order.save();
    
     // Assume payment details come from req.body; replace with actual payment processing as needed
     const payment = new Payment({
      orderId: newOrder._id,
      paymentId: paymentId || `PAY-${newOrder._id}`, // Generate or fetch actual payment ID
      customerName:customerName,
      customerMobile:customerNumber,
      productName:productName,
      totalPrice: totalPrice,
      paymentMethod:paymentMethod ,
      status: 'Pending', // Default to 'Pending' status
    });

    // Save the payment details
    const newPayment = await payment.save();
    
    
    res.status(201).json(newOrder);
  } catch (err) {
    console.log(err);
    
    res.status(400).json({ message: err.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Updating Status of order
router.put("/:id",async(req,res)=>{
  const { id } = req.params;
  const { status } = req.body;
  
  

  try {
    // Find the order by ID and update the status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json(updatedOrder); // Send the updated order back to the client
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status.' });
  } 
})

// DELETE route to delete an order by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
      // Find the order by ID and delete it
      const order = await Order.findByIdAndDelete(id);

      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }

      // Send a success response if deletion was successful
      res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Failed to delete the order' });
  }
});

module.exports = router;
