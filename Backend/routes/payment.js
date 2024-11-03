const express = require('express');
const router = express.Router();
const Payment = require('../model/Payment');


// all payements
router.get('/', async (req, res) => {
  try {
    const payment = await Payment.find();;
    if (payment == null) {
      return res.status(404).json({ message: 'Cannot find payment details' });
    }
    
    
    
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get payment details by order ID
router.get('/:orderId', async (req, res) => {
  try {
    const payment = await Payment.findOne({ orderId: req.params.orderId });
    if (payment == null) {
      return res.status(404).json({ message: 'Cannot find payment details' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete payment
router.delete('/:orderId', async (req, res) => {
  // console.log(req.params.orderId);
  
  try {
    const payment = await Payment.findByIdAndDelete(req.params.orderId);
    if (payment == null) {
      return res.status(404).json({ message: 'Cannot find payment details' });
    }
   
    res.send("Payment deleted")
    // res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
