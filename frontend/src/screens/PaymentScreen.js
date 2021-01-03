import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/PaymentScreen.css'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  // Calls/Invokes an action
  const dispatch = useDispatch()

  // Brings in Data from the global state (Redux Store)
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  //  Initialize State
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  // Checks if the shipping fields is not filled then redirect
  if (!shippingAddress) {
    history.push('/shipping')
  }

  // Submit Handler function
  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <main className='paymentScreen'>
      <CheckoutSteps step1 step2 step3 />
      <div className='paymentScreen__content'>
        <p className='title'>Payment Method</p>
        <div className='paymentScreen__formContainer'>
          <form onSubmit={submitHandler}>
            <p className='input-title'>Select Method:</p>
            <div>
              <input
                type='radio'
                id='paypal'
                value='Paypal'
                checked
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <label htmlFor='paypal'>PayPal or Credit Card</label>
            </div>

            <button type='submit'>Continue</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default PaymentScreen
