// controllers/adminController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin.js');
const Product = require('../model/Product.js');
const uploadToCloudinary = require('../cloudinaryUploader.js');

// Admin Signup
const registerAdmin = async (req, res) => {
  const { username, email, mobile, password } = req.body;
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Admin({
      username,
      email,
      mobile,
      password: hashedPassword
    });

    await newUser.save();
    console.log(newUser);
    
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.log(error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    } else if (error.code === 11000 && error.keyValue.email) {
      return res.status(400).send({ message: 'This email address is already registered.' });
    } else if (error.keyValue.mobile) {
      return res.status(400).send({ message: 'This mobile number is already registered.' });
    }
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email does not exist!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '2d' });
    
    res.status(200).json({ message: 'Login successful', token, username: user.username ,id:user._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Show all products (Admin)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Product Detail (Admin)
const getProductDetail = async (req, res) => {
  const { id } = req.params;
  
  try {
    const productDetail = await Product.findById(id);
    if (!productDetail) {
      return res.status(404).send("Product Not Found");
    }
    res.send(productDetail);
  } catch (error) {
    res.send("Something went wrong");
  }
};

// Add new Product
const addNewProduct = async (req, res) => {
  const { itemName, itemCategory, price, discount, description } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).send('Image file is required and must be less than 10 MB.');
  } 

  try {
    const result = await uploadToCloudinary(req.file.path, 'upload/');
  
    const newProduct = new Product({
      itemName,
      itemCategory,
      discount,
      price,
      netPrice: price - (price * (discount / 100)),
      description,
      imagePath: result.secure_url,
    });

    await newProduct.save();
    console.log(newProduct);
    
    res.status(201).send('New item added and saved to the database');
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image to Cloudinary', error });
  }
};

// Edit product
const editProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const productDetail = await Product.findById(id);
    if (!productDetail) {
      return res.status(404).send('Product not found');
    }
    res.send(productDetail);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const image = req.file;

  if (!image) {
    return res.status(400).send('Image file is required and must be less than 10 MB.');
  }

  try {
    const { itemName, itemCategory, price, description } = req.body;
    const result = await uploadToCloudinary(req.file.path, 'upload/');
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    product.itemName = itemName;
    product.itemCategory = itemCategory;
    product.price = price;
    product.description = description;
    product.imagePath = result.secure_url;
    
    await product.save();
    res.json("Product updated..");
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

// Delete Product (Admin)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send('Product not found');
    }
    res.send("One Product Deleted successfully");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// PATCH endpoint to update the discount percentage
const updateDiscount = async (req, res) => {
  const { id } = req.params;
  const { discountPercentage } = req.body;

  if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
    return res.status(400).json({ message: 'Invalid discount percentage' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.discount = discountPercentage;
    product.netPrice = product.price - (product.price * (discountPercentage / 100));
    
    await product.save();

    res.status(200).json({ message: 'Discount updated successfully', product });
  } catch (error) {
    console.error('Error updating discount:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllProducts,
  getProductDetail,
  addNewProduct,
  editProduct,
  updateProduct,
  deleteProduct,
  updateDiscount
};
