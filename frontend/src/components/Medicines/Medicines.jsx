import React, { useState, useEffect } from 'react'
import './Medicines.css'
import { getMedicines } from '../../api/medServices';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await getMedicines();
      setMedicines(response.data || data);
      setError(null);
    } catch (err) {
      console.error('Error fetching medicines:', err);
      setError('Failed to load medicines');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="med-container">
        <div className="loading">Loading medicines...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="med-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className='med-container'>
        <h2 className="med-title">Available Medicines</h2>
      {medicines.length === 0 ? (
        <div className="no-medicines">No medicines available</div>
      ) : (
        <div className="medicines-grid">
          {medicines.map((medicine) => (
            <div key={medicine._id} className="medicine-card">
              <h3 className="medicine-name">{medicine.name}</h3>
              <div className="medicine-details">
                <p><span>Brand:</span> {medicine.brand}</p>
                <p><span>Price:</span> ₹{medicine.price}</p>
                <p><span>Quantity:</span> {medicine.quantity} units</p>
                <p><span>Expiry Date:</span> {new Date(medicine.expireDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Medicines