import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${currentProductId}/related`);
        setRelatedProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedProducts();
  }, [currentProductId]);

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top
  };

  if (loading) return <div className="text-center">Loading related products...</div>;
  if (error) return <div className="text-danger text-center">Error: {error}</div>;

  return (
    <div className="row">
      {relatedProducts.map((product) => (
        <div key={product._id} className="col-md-3 mb-4">
          <Link to={`/products/${product._id}`} className="text-decoration-none" onClick={handleClick}>
            <div className="card h-100 position-relative">
              {/* Discount Badge */}
              {product.discount > 0 && (
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
                alt={product.itemName} 
                className="card-img-top" 
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {product.itemName}
                </h5>
                {/* Pricing Section */} 
                <div className="price-section">
                  {product.discount > 0 ? (
                    <div className='d-flex gap-3 justify-content-center'>
                      <strong className="card-text">
                        ₹{calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                      </strong>
                      <span className="card-text text-muted text-decoration-line-through">
                        ₹{product.price}
                      </span>
                    </div>
                  ) : (
                    <strong className="card-text">
                      ₹{product.price}
                    </strong>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
