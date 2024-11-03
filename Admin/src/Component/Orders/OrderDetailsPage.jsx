import React, { useState, useEffect } from 'react';
import { Container, Table, Dropdown, Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import InvoiceButton from './InvoiceButton'; // Import the InvoiceButton component

function OrderDetailsPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const fetchOrder = async () => {
    try {
      const orders = await axios.get("http://localhost:3000/api/orders");
      setOrders(orders.data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const statuses = [
    { label: 'Pending', variant: 'warning' },
    { label: 'Processing', variant: 'info' },
    { label: 'Completed', variant: 'success' },
    { label: 'Cancelled', variant: 'danger' }
  ];

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    axios.put(`http://localhost:3000/api/orders/${orderId}`, { status: newStatus });
  };

  const handleDelete = async (orderId) => {
       // Show confirmation dialog
       const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    
       if (!confirmDelete) return; 
    try {
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.log(error);
      setError('Failed to delete the order');
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>{error}</div>;

  // Custom styles
  const tableHeaderStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const dropdownStyle = {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    borderRadius: '5px',
  };

  const buttonStyle = {
    borderRadius: '5px',
    padding: '6px 12px',
  };

  const searchInputStyle = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    borderRadius: '5px',
  };

  return (
    <Container className="mt-4" style={{ backgroundColor: '#f2f4f8', padding: '20px', borderRadius: '8px' }}>
      <h1 className="mb-4 text-center">Order Details</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by Customer Name"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </InputGroup>
      <Table striped bordered hover responsive style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>#</th>
            <th style={tableHeaderStyle}>Customer Name</th>
            <th style={tableHeaderStyle}>Customer Phone</th>
            <th style={tableHeaderStyle}>Product Name</th>
            <th style={tableHeaderStyle}>Quantity</th>
            <th style={tableHeaderStyle}>Total Price</th>
            <th style={tableHeaderStyle}>Address</th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={tableHeaderStyle}>Invoice</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.customerName}</td>
              <td>{order.customerPhone}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.totalAmount}</td>
              <td>{order.address}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant={statuses.find(status => status.label === order.status)?.variant || 'secondary'}
                    id="dropdown-basic"
                    style={dropdownStyle}
                  >
                    {order.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {statuses.map((status) => (
                      <Dropdown.Item
                        key={status.label}
                        onClick={() => handleStatusChange(order._id, status.label)}
                      >
                        {status.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <InvoiceButton order={order} />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(order._id)} style={buttonStyle}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrderDetailsPage;
