import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/ShippingScreen.css'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  // Calls/Invokes an action
  const dispatch = useDispatch()

  // Brings in Data from the global state (Redux Store)
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  // Initialize state
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  // Submit Handler function
  const submitHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <main className='shippingScreen'>
      <CheckoutSteps step1 step2 />
      <div className='shippingScreen__content'>
        <p className='title'>Shipping</p>
        <div className='shippingScreen__formContainer'>
          <form onSubmit={submitHandler}>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              placeholder='Enter address'
              value={address}
              required
              onChange={e => setAddress(e.target.value)}
            />
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              placeholder='Enter city'
              value={city}
              required
              onChange={e => setCity(e.target.value)}
            />
            <label htmlFor='postalCode'>PostalCode</label>
            <input
              type='text'
              id='postalCode'
              placeholder='Enter postalCode'
              value={postalCode}
              required
              onChange={e => setPostalCode(e.target.value)}
            />
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              id='country'
              placeholder='Enter country'
              value={country}
              required
              onChange={e => setCountry(e.target.value)}
            />
            <button type='submit'>Continue</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ShippingScreen
