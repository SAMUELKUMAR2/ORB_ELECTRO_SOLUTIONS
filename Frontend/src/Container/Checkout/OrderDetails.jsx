import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
         
import axios from 'axios';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const [loading,setLoading]=useState(false)
    const [form, setForm] = useState({
        customerName: '',
        customerNumber: '',
        quantity: 1,
        address: '',
        productName: '',
        price: '',
        totalPrice: '',
        paymentMethod: ''
    });

    const paymentMethod = new URLSearchParams(location.search).get('paymentMethod');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === 'quantity' ? Math.max(1, Number(value)) : value
        }));
    };

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                const data = response.data;
                setForm((prevForm) => ({
                    ...prevForm,
                    productName: data.itemName,
                    price: data.netPrice ? data.netPrice : data.price,
                    totalPrice: (data.netPrice ? data.netPrice : data.price) * prevForm.quantity
                }));
            } catch (error) {
                setError(error.message);
            } finally {
               
            }
        };
        fetchDetail();
    }, [id]);

    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            totalPrice: prevForm.price * prevForm.quantity,
            paymentMethod: paymentMethod
        }));
    }, [form.quantity]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
           const OrderDetail = await axios.post(`http://localhost:3000/api/orders/${id}`, form,{
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
            console.log(OrderDetail);
            const O_ID =await OrderDetail.data._id;
            
            toast.success('Thank you! Your order has been successfully booked', {
                position: "top-center", // Position at top center
                autoClose: 3000,
                
                onClose: () => {
                  // Navigate to login page after the toast is closed
                  navigate(`/products/api/order/${O_ID}/thankyou`);
                },
              }) 
              
        }
         catch (error) {
            if(error.status==400 ||error.status==401){
                toast.error('Log in to continue with checkout.'),{
                    position:"top-center",
                    
                    onClose: () => {
                        // Navigate to login page after the toast is closed
                        navigate('/login');
                      }
                }
            }
            else{
                toast.error( 'Something went wrong.!', {
                    position: "top-center", // Position at top center
                  })
            }
            setError("Failed to place the order");
        } finally {
            setLoading(false);
        }
    };

    const labelStyle = {
        backgroundColor: '#e0f7fa',
        padding: '5px 10px',
        borderRadius: '5px',
        fontWeight: 'bold',
    };

    const inputStyle = {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px'
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease'
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Order Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="customerName" className="form-label" style={labelStyle}>Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="customerNumber" className="form-label" style={labelStyle}>Customer Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="customerNumber"
                        name="customerNumber"
                        value={form.customerNumber}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label" style={labelStyle}>Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        style={inputStyle}
                        min="1"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label" style={labelStyle}>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>

                {paymentMethod && (
                    <p style={{ fontWeight: 'bold' }} className="w-25 px-3 bg-info rounded">
                        <strong>Payment Method:</strong> {paymentMethod}
                    </p>
                )}

                <p><strong>Product Name:</strong> {form.productName}</p>
                <p><strong>Price per Item:</strong> Rs. {form.price}</p>
                <p><strong>Total Price:</strong> Rs. {form.totalPrice}</p>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" className="btn" style={buttonStyle}>
                    {loading ? <ClipLoader size={20} color="#fff" /> : 'Place Your Order'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default OrderDetails;
