// InvoiceButton.js
import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function InvoiceButton({ order }) {
  // Generate and download PDF invoice using jsPDF
  const generateInvoice = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(17);
    doc.text('Invoice', 105, 20, null, null, 'center');
    
    // Add company details
    // doc.setFontSize(10);
    // doc.text('Sold By: Tech-Connect Retail Private Limited', 20, 30);
    // doc.text('Ship-from Address: Rectangle No. 03, ', 20, 36);
    // doc.text('District: Panipat Hr-  Haryana India-132103 IN-HR', 20, 42);
    // doc.text('GSTIN: 06AAICA4872D1Z5', 20, 48);
    
    // // Add invoice details
    // doc.setFontSize(10);
    // doc.text('Invoice Number: ', 20, 40);
    // doc.text('Order ID: ', 20, 46);
    // doc.text('Order Date: 20-20-2024', 20, 52);
    // doc.text('Invoice Date: ', Date().now, 20, 58);


    const currentDateTime = new Date().toLocaleString();

    // Create invoice content
 
    doc.setFontSize(14);
    doc.text('Ship To:', 20, 42);
    doc.setFontSize(12);
    doc.text(`Customer Name: ${order.customerName}`, 20, 55);
    doc.text(`Customer Phone: ${order.customerPhone}`, 20, 65);
    doc.text(`Product Name: ${order.productName}`, 20, 75);
    doc.text(`Quantity: ${order.quantity}`, 20, 85);
    doc.text(`Total Price: ${order.totalAmount}`, 20, 95);
    doc.text(`Address: ${order.address}`, 20, 105);
    doc.text(`Status: ${order.status}`, 20, 115);

    // Add the timestamp at the bottom
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDateTime}`, 20, 120);
   
    
    // Add customer details
    // doc.text('Bill To:', 20, 60);
    // doc.text('Sunny Nagpal', 20, 66);
    // doc.text('1228 Gali no.6 arjun nagar, Gurgaon 122001 Haryana', 20, 72);
    // doc.text('Phone: xxxxxxxxxx', 20, 78);
    
    // doc.text('Ship To:', 20, 60);
    // doc.text(order.customerName, 20, 66);
    // doc.text(order.address, 20, 72);
    // doc.text('Phone:', order.customerPhone, 20, 78);
    
    // Add order details table
    doc.autoTable({
      startY: 135,
      head: [[ 'Product', 'Qty', 'Gross Amount ₹', 'Discount ₹',  'Total ₹']],
      body: [
        [
         
          order.productName, 
         order.quantity,
          Number(order.quantity) * order.price, 
          '0.00', 
          // 'Taxable Value ₹', 'CGST ₹', 'SGST/UTGST ₹',
          // (Number( ) * order.price * 0.9).toFixed(2), 
          // (Number(order.quantity) * order.price * 0.045).toFixed(2), 
          // (Number(order.quantity) * order.price * 0.045).toFixed(2), 
          Number(order.quantity) * order.price
        ],
      ],
      foot: [
        ['', '', '', '', '', '', 'Total',],
        ['', '', '', '', '', '', 'Grand Total']
      ],
    });
    
    // Add footer
    doc.text('Returns Policy:', 20, doc.autoTable.previous.finalY + 10);
    doc.text('At ORM Electronics we try to deliver perfectly each and every time. But in the off-chance that you need to return the item,', 20, doc.autoTable.previous.finalY + 16);
    doc.text('Contact Orm-Electronics: 1800 208 9898 | www.ormelectronics.com/helpcentre', 20, doc.autoTable.previous.finalY + 26);
    
    // Save the PDF
    doc.save('invoice.pdf');
  };



  return (
    <div className='d-flex'>
      {/* You can choose which button to display based on your use case */}
      <Button variant="primary" onClick={generateInvoice}>
        Download
      </Button>
      
    </div>
  );
}

export default InvoiceButton;
