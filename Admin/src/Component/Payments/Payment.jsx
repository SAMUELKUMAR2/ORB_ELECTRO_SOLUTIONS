import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Form, InputGroup, Button ,Row, Col} from 'react-bootstrap';

function PaymentDetailPage() {
  const [paymentDetails, setPaymentDetails] = useState([]); // Initialize as an array
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/payments`);
      setPaymentDetails(response.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  // Handle Delete of Payment
  const handleDelete = async (orderId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this payment?");
    
    if (!confirmDelete) return; 

    try {
      await axios.delete(`http://localhost:3000/api/payments/${orderId}`);
      setPaymentDetails((prePayment) => prePayment.filter(payment => payment._id !== orderId));
      console.log("Payment deleted successfully");
    } catch (error) {
      console.log(error);
      setError('Failed to delete the order');
    }
  };

  const searchInputStyle = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    borderRadius: '5px',
  };

  const filteredPayment = paymentDetails.filter(payment =>
    payment.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Define styles for header and data cells
  const headerStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  };
  
  const dataStyle = {
    backgroundColor: '#f8f9fa',
    textAlign: 'center'
  };



  if (error) return <div className='w-100 text-center pt-3'>{error}</div>;

  return (
    <Container>
      <h1>Payment Details</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by Customer Name"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </InputGroup>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={headerStyle}>Sr.No</th>
                <th style={headerStyle}>Payment ID</th>
                <th style={headerStyle}>Customer</th>
                <th style={headerStyle}>Product Name</th>
                <th style={headerStyle}>Total Price</th>
                <th style={headerStyle}>Payment Method</th>
                <th style={headerStyle}>Payment Date</th>
                <th style={headerStyle}></th>
              </tr>
            </thead>
            <tbody>
              {filteredPayment.map((payment, index) => (
                <tr key={payment.paymentId}>
                  <td style={dataStyle}>{index + 1}</td>
                  <td style={dataStyle}>{payment.paymentId}</td>
                  <td style={dataStyle}>{payment.customerName}/{payment.customerMobile}</td>
                  <td style={dataStyle}>{payment.productName}</td>
                  <td style={dataStyle}>{payment.totalPrice}</td>
                  <td style={dataStyle}>{payment.paymentMethod}</td>
                  <td style={dataStyle}>{payment.date}</td>
                  <td style={dataStyle}>
                    <button className='btn btn-danger' onClick={() => handleDelete(payment._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentDetailPage;
