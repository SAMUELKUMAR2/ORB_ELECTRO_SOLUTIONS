import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ThankYouImage from '../../assets/thankyou.jpg'
import { useState } from 'react';
import axios from 'axios';
import InvoiceButton from '../Checkout/InvoiceButton';
const ThankYou = () => {

    const {id}= useParams();
    const navigate = useNavigate();
    const [Order, setOrder] = useState("");
    const handleRedirect = () => {
        navigate('/');
    };

    const fetchOrder = async () => {
        try {
          const order = await axios.get(`http://localhost:3000/api/orders/${id}`);
          setOrder(order.data);
          
          
        } catch (error) {
          console.log(error);
         
        }
      };
    
      useEffect(() => {
        fetchOrder();
      }, []);

    return (
        <div className=" text-center mt-5">
            <h2>Thank You for Your Order!</h2>
           <div className='d-block '>
           <img src={ThankYouImage} alt="Thank You" style={{ width: '300px', margin: '20px 0' }} />
           <br />
         <div className='d-flex justify-content-center gap-5'>
               <button className="btn btn-info" onClick={handleRedirect}>
                Go to Home Page
            </button>
            <InvoiceButton order={Order} /></div>
           </div>
        </div>
    );
};

export default ThankYou;
