import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from "./auth/AuthContext";
import Signup from "./auth/Signup";
import Login from './Auth/Login';
import UpdateProfile from './Auth/UpdateProfile';

import Navbar from "./Component/NavbarPage";
import Footer from './Component/Footer'
import HomePage from "./Component/HomePage"
import AddItemForm from "./Component/AddProduct/AddItemForm";
import ProductEditForm from "./Component/AddProduct/EditProductForm";
import OrderDetailsPage from "./Component/Orders/OrderDetailsPage";
import InvoicePage from "./Component/Orders/InvoiceButton";
import PaymentDetailPage from './Component/Payments/Payment';

function App() {

  return ( 
    <>
   <div >
     <AuthProvider>
   <Router>
   <div className="sticky-top bg-white overflow-hidden shadow-lg">
   <Navbar />
   </div>
      <Routes>
        {/* Route for the Product List */}
        <Route path="/" element={<HomePage />} />

        <Route path="/admin/login" element = {<Login />} />
        <Route path="/admin/register" element = {<Signup />} />
        <Route path="/admin/profile" element = {<UpdateProfile />} />


        {/* Add New Item */}
        
        <Route path="/products/additem" element = {<AddItemForm />} />
        {/* Edit Page */}
        <Route path="/admin/edit/:id" element={<ProductEditForm />} />

      {/* order Details */}
      <Route path="/products/orders" element = {<OrderDetailsPage />} />

    {/* order Invoice */}
    <Route path="/products/invoice" element = {<InvoicePage />} />

    {/* Payment Details */}
    <Route path="/products/payments" element = {<PaymentDetailPage />} />

      </Routes>
      <div>
      <Footer />  
    </div>
    </Router>
    </AuthProvider>
   </div>
    </>
  )
}

export default App
