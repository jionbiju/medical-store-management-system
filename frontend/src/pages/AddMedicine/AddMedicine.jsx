import React, { useState } from 'react'
import axios from 'axios'
import './AddMedicine.css'
import { toast } from 'react-toastify';
import { addMedicine } from '../../api/medServices';
import { useNavigate } from 'react-router-dom';

const AddMedicine = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    quantity: '',
    expireDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!formData.name || !formData.brand || !formData.price || !formData.expireDate) {
      toast.error("Please fill all required fields")
      return;
    }

    try {
      setLoading(true);
      const response = await addMedicine(formData);
      
      if (response.success) {
        toast.success(response.message);
        
        setFormData({
          name: '',
          brand: '',
          price: '',
          quantity: '',
          expireDate: ''
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding medicine:', error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='addMed-container'>
      <div className="addMed-card">
        <h2>Add Medicine</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Medicine Name <span>*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter medicine name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand <span>*</span></label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹) <span>*</span></label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="expireDate">Expiry Date <span>*</span></label>
            <input
              type="date"
              id="expireDate"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddMedicine