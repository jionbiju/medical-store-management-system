import React, { useState, useEffect } from 'react';
import './MedicinesWithSearch.css'
import { getMedicines, searchMedicine, deleteMedicine } from '../../api/medServices';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const MedicinesWithSearch = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  
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
      setMedicines(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching medicines:', err);
      setError('Failed to load medicines');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      setSearchLoading(true);
      const response = await searchMedicine(searchQuery);
      setSearchResults(response.data || response);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching medicines:', error);
      toast.error(error.response?.data?.message || 'Search failed');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMedicine(id);
      if (response.success) {
        toast.success("Medicine deleted");
        setMedicines(medicines.filter((med) => med._id !== id));
        setSearchResults(searchResults.filter((med) => med._id !== id));
      }
    } catch (error) {
      console.log("Error while deletion:", error);
      toast.error("Failed to delete");
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div>
      {/* Search Section */}
      <div className='search-section'>
        <div className='search-container'>
          <div className="search-wrapper">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search medicines by name or brand"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              className="search-button" 
              onClick={handleSearch}
              disabled={searchLoading}
            >
              {searchLoading ? 'Searching...' : 'Search'}
            </button>
            {showResults && (
              <button className="clear-button" onClick={clearSearch}>
                Clear
              </button>
            )}
          </div>
        </div>

       
        {showResults && (
          <div className="search-results-container">
            <h3 className="results-title">
              Search Results ({searchResults.length})
            </h3>
            <div className="results-grid">
              {searchResults.map((medicine) => (
                <div key={medicine._id} className="result-card">
                  <h4 className="result-name">{medicine.name}</h4>
                  <div className="result-details">
                    <p><span>Brand:</span> {medicine.brand}</p>
                    <p><span>Price:</span> ₹{medicine.price}</p>
                    <p><span>Quantity:</span> {medicine.quantity} units</p>
                    <p><span>Expiry:</span> {new Date(medicine.expireDate).toLocaleDateString()}</p>
                    <button className="delete-btn" onClick={() => handleDelete(medicine._id)}>
                      <MdDelete className="icon" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* All Medicines Section */}
      <div className='med-container'>
        <h2 className="med-title">Available Medicines</h2>
        
        {loading ? (
          <div className="loading">Loading medicines...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : medicines.length === 0 ? (
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
                  <button className="delete-btn" onClick={() => handleDelete(medicine._id)}>
                    <MdDelete className="icon" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicinesWithSearch;