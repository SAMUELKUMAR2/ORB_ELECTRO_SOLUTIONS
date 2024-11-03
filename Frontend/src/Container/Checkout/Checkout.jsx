import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Auth/AuthContext.jsx';
const baseUrl = import.meta.env.VITE_BASE_URL;

const Checkout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('COD'); // State for selected payment method

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

  const handleClick =()=>{
    {toast.error( 'Please Login first !', {
      position: "top-center", // Position at top center
   
      onClose: () => {
        navigate('/login');
      }
   })}
  }

  if (loading) return <div className="text-danger text-center mt-5">loading... {error}</div>;
  if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;

  // Function to handle payment selection
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  // Construct query parameters
  const queryParams = new URLSearchParams({
    paymentMethod: selectedPayment,
  }).toString();

  return (
    <>
      <div>
        <div className="mt-3 h-5 d-flex justify-content-center ">
          <h1>CheckOut</h1>
        </div>
        {/* User Address */}
        <div className="">
          <hr />
          <div className="mx-4 d-flex justify-content-between">
            <h4 className="px-3">1.Delivery Address</h4>
            <h5>
              <span>please provide the correct information and address details to ensure accuracy.</span>
              
            </h5>
            <div className="">
              {/* <button className="btn btn-dark">change</button> */}
            </div>
          </div>
        </div>
        {/* Product Review */}
        <div className="mx-4 py-2">
          <hr />
          <h4 className="mx-3">2. Review items and Delivery</h4>
          <div className="d-flex flex-column flex-md-row mx-5 my-3 p-5 rounded d-flex gap-4" style={{ background: "#D9D9D9" }}>
            <img src={product.imagePath} alt="image"
              className=""
              style={{ maxHeight: '200px', objectFit: 'cover' }} />
            <div>
              <h3>{product.itemName}</h3> <hr />
              <h6>{product.description}</h6>
            </div>
          </div>
        </div>
        {/* Payment method */}
        <div className="mx-5 ">
          <h4 className="mx-5">3. Payment method - </h4>
          <div className="mx-sm-5 d-flex gap-2">
            <input
              type="radio"
              value="COD"
              checked={selectedPayment === 'COD'}
              onChange={handlePaymentChange}
            />
            <span>Cash on Delivery</span>
          </div>
          <div className="mx-sm-5 d-flex gap-2">
            <input
              type="radio"
              value="upi"
              checked={selectedPayment === 'upi'}
              onChange={handlePaymentChange}
            />
            <span>UPI</span>
          </div>
        </div>
        <div className="my-2 ">
          <hr />
        </div>
        {/* Place order button */}
        <div className="m-4 d-flex justify-content-center">
          <h6>When your order is placed, we'll provide invoice Download option to acknowledging receipt of your order. <br />
            you can pay using cash/COD/UPI or you can contact to Owner.</h6>
        </div>
        <div className="m-4 d-flex justify-content-center">
          {user ? <Link to={`/products/order/${product._id}?${queryParams}`}>
            <button className="btn btn-success p-4 py-2">Place your Order</button>
          </Link>: <>  <button className="btn btn-success p-4 py-2" onClick={handleClick}>Place your Order</button></>}
        </div>
        <ToastContainer />
      </div>
 
    </>
  );
};

export default Checkout;
