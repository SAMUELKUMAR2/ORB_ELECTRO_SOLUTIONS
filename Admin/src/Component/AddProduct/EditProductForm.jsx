import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../NavbarPage.jsx"
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
const baseUrl = import.meta.env.VITE_BASE_URL;
const EditProductForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    itemName: '',
    itemCategory: '',
    price: '',
    description: '',
    image: null
  });

  const {id} = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: e.target.files[0] });
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/admin/edit/${id}`);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('itemName', formData.itemName);
    formDataToSend.append('itemCategory', formData.itemCategory);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);

    try {
      setLoading(true);
      const response = await axios.put(`${baseUrl}/admin/edit/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Item added:', response.data);

     
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.message);
    }
    finally{
      setFormData({
        itemName: '',
        itemCategory: '',
        price: '',
        description: '',
        image: null,
      })
      setLoading(false);
    }
   
 
  };

   if (error) return <div className="text-danger text-center">Error: {error}</div>; // Display error in red

  return (
  <>
    <div className='fixed-top shadow-lg '>
    <Navbar />
  </div>
    <div className="container  p-3 ">
     
     <div className='text-center'>
     
      <h2>Edit Form</h2>
      
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

        <div className="mb-3">
        <img
                src={imagePreview?imagePreview:`http://localhost:3000/${formData.imagePath}`} 
                className="card-img-top hover-image m-2 " // Add custom hover class
                alt={formData.itemName}
                style={{ height: '100px',width:'150px', objectFit: 'cover' }}
              />
          
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className='w-100 pb-5'>
      <button type="submit" className="btn btn-success w-100">
      {loading ? <ClipLoader size={20} color="#fff" /> : 'Update Product'}
      </button>
      </div>

           </form>
    </div>
  </>
  );
};

export default EditProductForm;
