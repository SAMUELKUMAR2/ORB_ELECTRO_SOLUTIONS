const express = require("express");
const router = express.Router();    
const wrapAsync = require("../utils/wrapAsync.js")
const productsController = require("../controllers/products.controller.js");
const Product = require('../model/Product.js');
const path = require('path');
const multer = require("multer");



router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Set up storage for Multer (to handle file uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// All products (Client)
router.get('/', wrapAsync(async (req, res) => {

  try {
    const products = await Product.find(); 
    res.status(200).json(products); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
}));

// Product Details(Client)
router.get("/:id",wrapAsync(async(req,res)=>{
  const {id} = req.params;
  try {
    const Details = await Product.findById(id);
    if(!Details){
      res.send("Product Not Found")
    }
    res.send(Details);
  } catch (error) {
    res.send("Something went wrong");
  }
}))

// Get related products by category
router.get('/:id/related', async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Fetch related products based on the same category, excluding the current product
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: productId } // Exclude the current product
    }).limit(5); // Limit to 5 related products

    res.json(relatedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;