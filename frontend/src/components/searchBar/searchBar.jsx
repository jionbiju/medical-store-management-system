import React, { useState } from 'react';
import './SearchBar.css';
import { searchMedicine } from '../../api/medServices';
import { toast } from 'react-toastify';
import { data } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      setLoading(true);
      const response = await searchMedicine(searchQuery);
      setSearchResults(response.data || response);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching medicines:', error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
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
            disabled={loading}
          >
            Search
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
                  </div>
                </div>
              ))}
            </div>
          
        </div>
      )}
    </div>
  )
}

export default SearchBar