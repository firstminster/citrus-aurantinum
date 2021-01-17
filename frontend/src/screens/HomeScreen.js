import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/HomeScreen.css'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Spinner from '../components/Spinner'

const HomeScreen = () => {
  // useDispatch - calls/invoke an action
  const dispatch = useDispatch()

  // useSelector - pulls in data from the global state (Redux store)
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  // Cause a side-effect when the component loads
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <main className='home'>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <img
            className='home__cover-image'
            src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/gateway/placement/launch/TruthSeekersS1/TSKR_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB418070590_.jpg'
            alt=''
          />
          <div className='home__products'>
            {products?.map(product => (
              <div key={product._id} className='home__products-card'>
                <Product product={product} />
              </div>
            ))}
          </div>{' '}
        </>
      )}
    </main>
  )
}

export default HomeScreen
