import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const baseUrl = import.meta.env.VITE_BASE_URL;

const AddItemForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    itemName: '',
    itemCategory: '',
    price: '',
    discount:'',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData({ ...formData, image: e.target.files[0] });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('itemName', formData.itemName);
    formDataToSend.append('itemCategory', formData.itemCategory);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('discount', formData.discount);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);
    
    console.log(formDataToSend);
    

    try {
      setLoading(true);
      await axios.post(`${baseUrl}/admin/additem`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Product Added Successfully!', {
        position: "top-center", // Position at top center
        autoClose: 1000,
        
       
      }) 

     
    } catch (error) {
      toast.error('Failed to Add Product.'),{
        position:"top-center",
        
    }
      // console.error('Error adding item:', error.response ? error.response.data : error.message);
      setError( error.message);
    }
    finally{
      setFormData({
        itemName: '',
        itemCategory: '',
        price: '',
        discount:'',
        description: '',
        image: null,
      })
      setLoading(false);
    }
  };

 
  if (error) return <div className="text-danger text-center">Error: {error}</div>; // Display error in red

  return (
  <>
   
    <div className="container pt-4">
     
     <div className='text-center'>
      
      <h2>Add New Item</h2>
     
     </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="itemCategory" className="form-label">Item Category</label>
          <input
            type="text"
            className="form-control"
            id="itemCategory"
            name="itemCategory"
            value={formData.itemCategory}
            onChange={handleChange}
            placeholder="Enter item category"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter item price"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discount" className="form-label">Discount(%)</label>
          <input
            type="number"
            className="form-control"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Enter the discount Eg:10"
            required
          />
        </div>

        <div className="mb-3 ">
          <label htmlFor="description" className="form-label">description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter item description"
            required
          />
        </div>
{/* image */}
        <div className="mb-3 border-2 border-black position-relative">
       {imagePreview &&  <img
                src={imagePreview} 
                className="card-img-top hover-image p-2 " // Add custom hover class
                alt={imagePreview}
                style={{ height: '100px',width:'150px',borderRadius:"20px", objectFit: 'cover' }}
              />}
          {imagePreview?"":
          <label htmlFor="image" className="form-label">Image</label>
          }
          <input
            type="file"
            className="form-control m-3"
            id="image"
            name="image"
            onChange={handleImageChange}
             required
          />
         
        </div>
      <div className='w-100 pb-5'>
      <button type="submit" className="btn btn-success w-100">
      {loading ? <ClipLoader size={20} color="#fff" /> : 'Add Product'}
      </button>
      </div>
      </form>
      <ToastContainer />
    </div>
  </>
  );
};

export default AddItemForm;
