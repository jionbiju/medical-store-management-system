import React from 'react'
import Navbar from '../components/Navbar/Navbar'
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
