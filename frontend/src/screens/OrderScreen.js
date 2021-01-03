import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/OrderScreen.css'
import Message from '../components/Message'

const OrderScreen = () => {
  return (
    <main className='orderScreen'>
      {/* Order Details */}
      <div className='orderScreen__Details'>
        <p className='orderscreen__title'>Order: 5FC43B167C696C000411AD14</p>
        <div className='orderScreen__shipDetails'>
          <p className='title'>Shipping</p>
          <p className='orderScreen__Details-content'>
            <strong>Name:</strong> <span>John Doe</span>
          </p>
          <p className='orderScreen__Details-content'>
            <strong>Email:</strong> <span>john@example.com</span>
          </p>
          <p className='orderScreen__Details-content'>
            <strong>Address:</strong>{' '}
            <span>Lantmannavagen 12, Trollhattan, 46160, Sweden.</span>
          </p>
          <Message msg={'Not Delivered'} messageType={'danger'} />
        </div>
        <div className='orderScreen__payMethod'>
          <p className='title'>Payment Method</p>
          <p className='orderScreen__Details-content'>
            <strong>Method:</strong> <span> PayPal</span>
          </p>
          <Message msg={'Paid'} messageType={'success'} />
        </div>
        <div className='orderScreen__orderItems'>
          <p className='title'>Order Items</p>
          <div className='orderScreen__Details-items'>
            <img src='' alt='' className='' />
            <Link to={`/product/$`}>
              <p className=''>{/* {item.name} */}</p>
            </Link>
            <p className=''>{/* ${item.price} */}</p>
          </div>
        </div>
      </div>
      {/* Order Summary */}
      <div className='orderScreen__orderSummary'>
        <table>
          <thead>
            <tr>
              <th colSpan='2'>ORDER SUMMARY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Items</td>
              <td>$599.99</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>$0.00</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>$90.00</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>$689.99</td>
            </tr>
            <tr>
              <td colSpan='2'>
                <button
                  className='orderScreen__orderSummary-btn'
                  type='button'
                  //   disabled={cart.cartItems === 0}
                  //   onClick={}
                >
                  Mark As Delivered
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default OrderScreen
