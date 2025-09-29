
import React from 'react'
import './SearchBar.css'

const SearchBar = () => {
  return (
    <div className='search-container'>
      <div className="search-wrapper">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search medicines by name, manufacturer, or category..."
        />
      </div>
    </div>
  )
}

export default SearchBar