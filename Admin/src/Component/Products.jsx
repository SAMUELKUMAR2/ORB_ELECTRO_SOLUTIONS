import React, { useEffect, useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = import.meta.env.VITE_BASE_URL;
const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/admin/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        
        console.log(error);
        toast.error("Please Log in to continue.", {
          position: "top-center",
          autoClose: 1000,
          onClose: () => navigate('/admin/login') // Navigate after toast closes
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
     const response = await axios.delete(`${baseUrl}/admin/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
     });
     toast.success("Product Deleted successfully", {
      position: "top-center",
      autoClose: 2000,
      onClose: () => window.location.reload()
    });
    
    }
    catch (error) {
      console.log(error);
      
      if(error.status==400 ||error.status==401){
          toast.error('Please login...'),{
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
      setError("something went wrong.");
  }
  };

  const handleEdit = (id) => {
    navigate(`admin/edit/${id}`);
  };

  // Function to handle setting a discount
  const handleSetDiscount = async (id) => {
    const discountPercentage = prompt("Enter discount percentage:");
    if (discountPercentage !== null && !isNaN(discountPercentage)) {
      try {
        const productDetails = await axios.patch(`${baseUrl}/admin/${id}/discount`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
          },
            discountPercentage: parseFloat(discountPercentage),
          }
        );
        console.log(productDetails);
        window.location.reload(); // Refresh to show the updated discount
      } catch (error) {
        console.error("Error setting discount:", error);
        alert("Failed to set discount. Please try again.");
      }
    } else {
      alert("Please enter a valid number for the discount percentage.");
    }
  };

  // Filter orders based on search term
  const filteredOrders = products.filter((product) =>
    product.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center">Loading...</div>; // Center loading text
  if (error)
    return <div className="text-danger text-center">Error: {error}</div>; // Display error in red

  return (
    <>
      <Container className=" m-auto">
        <h2 className="text-center mb-4">Admin Panel (ALL Products)</h2>
        <div className="mx-3">
          <InputGroup className=" ">
            <Form.Control
              placeholder="Search by Product Name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="col">
          {filteredOrders
            .slice() // Create a shallow copy to avoid mutating the original array
            .reverse()
            .map((product) => (
              <div className="shadow-lg m-3" key={product._id}>
                <div className="p-3 d-flex flex-column flex-md-row justify-content-between align-content-center shadow-sm overflow-hidden">
                  <img
                    src={product.imagePath}
                    className="card-img-top hover-image m-2 m-auto"
                    alt={product.itemName}
                    style={{
                      height: "120px",
                      width: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="px-4 flex-grow-1 m-auto d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <h5 className="card-text pt-2">{product.itemName}</h5>
                    <div>
                      <p className="card-text p-2 ">
                        <strong>Price: </strong>Rs.{product.price}
                      </p>
                    </div>
                    {product.discount ? (
                      <p className="p-2 bg-danger rounded">
                        {product.discount}% off
                      </p>
                    ) : (
                      <p className="px-2 py-1 bg-danger rounded">0% off</p>
                    )}
                    <p className="card-text p-2">
                      <strong>Category: </strong>
                      {product.itemCategory}
                    </p>

                    <div className="d-none d-md-flex flex-column gap-3 ml-auto">
                      <a href="#" className="btn btn-primary">
                        View
                      </a>
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="btn btn-info"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      {/* New "Set Discount" button */}
                      <button
                        onClick={() => handleSetDiscount(product._id)}
                        className="btn btn-warning"
                      >
                        Set Discount
                      </button>
                    </div>
                  </div>
                  <div className="d-flex d-md-none flex-column gap-3 mt-3">
                    <a href="#" className="btn btn-primary">
                      View
                    </a>
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="btn btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    {/* New "Set Discount" button */}
                    <button
                      onClick={() => handleSetDiscount(product._id)}
                      className="btn btn-warning"
                    >
                      Set Discount
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Products;
