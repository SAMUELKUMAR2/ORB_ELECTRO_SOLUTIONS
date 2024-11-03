import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading();
        const response = await axios.get('http://localhost:3000/products/');
        // Set default discountPercentage to 0 if not provided
        console.log(response.data);
        
        const productsWithDefaultDiscount = response.data.map((product) => ({
          ...product,
          discount: product.discount || 0,
        }));
        setProducts(productsWithDefaultDiscount);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  // Function to group products by category
  const groupProductsByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.itemCategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  if (loading) return <div className="text-center mt-3">Loading...</div>; // Center loading text
  if (error) return <div className="text-danger">Error: {error}</div>; // Display error in red

  // Group products by category
  const productsByCategory = groupProductsByCategory(products);

  return (
    <div className="container ">
      <h2 className="text-center mb-3">Products List</h2>
      <hr />
      {Object.keys(productsByCategory).map((category) => (
        <div key={category} >
          {/* Category Title */}
          <div className='shadow-lg px-4'>
          <h3 className=" my-4 pt-2">{category}</h3>
          <div className="row">
            {productsByCategory[category].map((product) => (
              <div
                className="col-md-4 mb-4 shadow-lg p-3 cursor-pointer"
                onClick={() => handleClick(product._id)}
                key={product._id}
              >
                <div className="card shadow-sm overflow-hidden position-relative">
                  
                  {/* Discount Badge */}
                  {product.discount >= 0 && (
                    <div
                      className="badge position-absolute"
                      style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        top: '8px',
                        left: '10px',
                        padding: '5px 10px',
                        fontSize: '12px',
                        borderRadius: '3px',
                        zIndex: 1,
                      }}
                    >
                      {product.discount}% OFF
                    </div>
                  )}
                  <img
                    src={product.imagePath}
                    className="card-img-top hover-image m-2"
                    alt={product.itemName}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <span className="card-text">{product.details}</span>

                    {/* Pricing Section */} 
                    <div className="price-section">
                    <h5 className="card-title text-center mt-2">{product.itemName}</h5>
                      {product.discountPercentage >= 0 ? (
                        <div className='d-flex gap-3 justify-content-center'>
                          <strong className="card-text">
                            ₹{calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                          </strong>
                          <span className="card-text text-muted text-decoration-line-through">
                            ₹{product.price}
                          </span>
                        </div>
                      ) : (
                        <span className="card-text">
                         
                         <div className='d-flex gap-3 justify-content-center'>
                          <strong className="card-text">
                            ₹{calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                          </strong>
                          <span className="card-text text-muted text-decoration-line-through">
                            ₹{product.price}
                          </span>
                        </div>
                        </span>
                      )}
                    </div>

                    <a href={`/products/${product._id}`} className="btn btn-primary mt-3">
                      View More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
