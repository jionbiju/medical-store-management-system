import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import SearchBar from '../components/searchBar/searchBar'
import Medicines from '../components/Medicines/Medicines'
import MedicinesWithSearch from '../components/MedicinesWithSearch/MedicinesWithSearch'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <MedicinesWithSearch/>
      {/* <SearchBar/>
      <Medicines/> */}
    </div>
  )
}

export default Home
