import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import SearchBar from '../components/searchBar/searchBar'
import Medicines from '../components/Medicines/Medicines'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <SearchBar/>
      <Medicines/>
    </div>
  )
}

export default Home
