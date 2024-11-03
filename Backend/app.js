const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError.js');
const path = require('path');
const clientRoutes = require('./routes/client.js')
const adminRoutes = require('./routes/admin.js')
const productRoutes = require('./routes/products.js')
const orderRoutes = require('./routes/order.js')
const paymentRoutes = require('./routes/payment.js');
const updateRoutes = require('./routes/profileUpdate.js')
const app = express();

// Connecting to the DataBase
const MONGO_URL =process.env.MONGO_DB_URL;
main()
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log('Connection Failed|', err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Use CORS middleware
app.use(cors()); 

// Set up bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Server Started');
});

app.use('/', clientRoutes);

app.use('/admin',adminRoutes);

app.use('/products',productRoutes)

app.use('/api/orders', orderRoutes);

app.use('/api/payments', paymentRoutes);

app.use('/api/user',updateRoutes)


// Error Handling for file upload errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send('File size is too large. Maximum limit is 10 MB.');
    }
    return res.status(400).send(err.message);
  } else if (err) {
    return res.status(500).send('Something went wrong.');
  }
  next();
});

// Error Handling for all other errors
app.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Page not Found!'));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).send(message);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on :${port}`);
});
