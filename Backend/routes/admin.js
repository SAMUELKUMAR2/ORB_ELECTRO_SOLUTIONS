// routes/adminRoutes.js

const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const multer = require("multer");
const isLoggedIn = require("../middleware.js");
const {
  registerAdmin,
  loginAdmin,
  getAllProducts,
  getAllClients,
  deleteClient,
  getProductDetail,
  addNewProduct,
  editProduct,
  updateProduct,
  deleteProduct,
  updateDiscount
} = require('../controllers/adminController.js');

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // local storage folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

// Admin Signup
router.post('/register', wrapAsync(registerAdmin));

// Admin Login
router.post("/login", wrapAsync(loginAdmin));

// Show all products (Admin)
router.get('/products', isLoggedIn, wrapAsync(getAllProducts));

// Show all Clients (Admin)
router.get('/clients', isLoggedIn, wrapAsync(getAllClients));

// Delete selected client (Admin)
router.delete('/clients/:id', isLoggedIn, wrapAsync(deleteClient));

// Product Detail (Admin)
router.get("/products/:id", wrapAsync(getProductDetail));

// Add new Product
router.post('/additem', upload.single('image'), wrapAsync(addNewProduct));

// Edit product
router.get("/edit/:id", wrapAsync(editProduct));

// Update product
router.put('/edit/:id', upload.single('image'), wrapAsync(updateProduct));

// Delete Product (Admin)
router.delete("/:id", isLoggedIn, wrapAsync(deleteProduct));

// PATCH endpoint to update the discount percentage
router.patch('/:id/discount', wrapAsync(updateDiscount));

module.exports = router;
