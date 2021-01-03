import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/CheckoutSteps.css'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <main className='checkoutSteps'>
      <div className='checkoutSteps__content'>
        <div className='checkoutSteps__content-stepItem'>
          {step1 ? (
            <Link to='/login'>
              <p className='stepItem__text'>Sign In</p>
            </Link>
          ) : (
            <p className='stepItem__text disabled' disabled>
              Sign In
            </p>
          )}
        </div>
        <div className='checkoutSteps__content-stepItem'>
          {step2 ? (
            <Link to='/shipping'>
              <p className='stepItem__text'>Shipping</p>
            </Link>
          ) : (
            <p className='stepItem__text disabled' disabled>
              Shipping
            </p>
          )}
        </div>
        <div className='checkoutSteps__content-stepItem'>
          {step3 ? (
            <Link to='/payment'>
              <p className='stepItem__text'>Payment</p>
            </Link>
          ) : (
            <p className='stepItem__text disabled' disabled>
              Payment
            </p>
          )}
        </div>
        <div className='checkoutSteps__content-stepItem'>
          {step4 ? (
            <Link to='/placeorder'>
              <p className='stepItem__text'>Place Order</p>
            </Link>
          ) : (
            <p className='stepItem__text disabled' disabled>
              Place Order
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default CheckoutSteps
