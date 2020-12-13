import React, { useState, useEffect } from 'react'
import '../styles/HomeScreen.css'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')

      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <main className='home'>
      <img
        className='home__cover-image'
        src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/gateway/placement/launch/TruthSeekersS1/TSKR_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB418070590_.jpg'
        alt=''
      />
      {/* <h1 className=''>LATEST PRODUCTS</h1> */}
      <div className='home__products'>
        {products.map(product => (
          <div key={product._id} className='home__products-card'>
            <Product product={product} />
          </div>
        ))}
      </div>
    </main>
  )
}

export default HomeScreen
