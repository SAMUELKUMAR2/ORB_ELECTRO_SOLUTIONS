import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import RelatedProducts from './RelatedProducts';
const baseUrl = import.meta.env.VITE_BASE_URL;
const ProductDetail = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="text-danger text-center mt-5">loading... {error}</div>;
  if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;

  return (
    <>
      <div className="container mt-4">
        <div className="d-md-flex justify-content-evenly gap-5">
          <div className="product-image-container text-center">
            <img 
              src={product.imagePath} 
              alt="" 
              style={{
                width: "100%", // Adjusted to take full container width
                height: "auto",
                maxWidth: "400px", // Sets a max size for responsiveness
                padding: "5px",
                objectFit: "cover",
                borderRadius: "8px" // Adds a slight border radius for aesthetics
              }}
            />
            <hr />
            <span 
              className="product-name" 
              style={{
                fontWeight: "600", 
                fontFamily: "serif", 
                fontSize: "24px",
                display: "block",
                marginTop: "10px"
              }}
            >
              {product.itemName}
            </span>
            <hr />
            <span 
              className="product-price" 
              style={{
                fontWeight: "bold", 
                fontFamily: "serif", 
                fontSize: "28px", 
                color: "#555" // Subtle color for price emphasis
              }}
            >
              Rs. {product.netPrice ? product.netPrice : product.price}
            </span>
          </div>

          {/* Detail Card */}
          <ProductCard product={product} />
        </div>

        <hr />

        <div className="about-item-section p-3">
          <span 
            className="about-heading" 
            style={{
              fontWeight: "bold", 
              fontFamily: "serif", 
              fontSize: "24px",
              textDecoration: "underline"
            }}
          >
            About this Item
          </span>
          <div 
            className="product-description mt-3" 
            style={{
              fontWeight: "400", 
              fontFamily: "serif", 
              fontSize: "18px", 
              lineHeight: "1.6",
              color: "#666"
            }}
          >
            {product.description}
          </div>
        </div>

        <div className="buy-button-container text-center mt-4">
          <Link to={`/products/${product._id}/buy`}>
            <button 
              className="btn btn-success" 
              style={{ 
                width: "80%", // Responsive button width
                maxWidth: "300px", // Limits max width for large screens
                fontSize: "18px",
                padding: "10px 0" 
              }}
            >
              Buy
            </button>
          </Link>
        </div>
        {/* Related Products */}
<div className="related-products mt-5">
  <h3 className="text-center mb-4" style={{ fontFamily: 'serif' }}>Related Products</h3>
  <RelatedProducts currentProductId={product._id} />
</div>
      </div>
    </>
  );
};

export default ProductDetail;
