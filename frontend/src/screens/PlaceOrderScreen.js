import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/PlaceOrderScreen.css'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
  // Calls/Invokes an action
  const dispatch = useDispatch()

  // Brings in Data from the global state (Redux Store)
  const cart = useSelector(state => state.cart)

  // Function that add two decimal to a value
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  // Calculate price of all items
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  // Calculate shipping cost
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

  // Calculate Tax
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice))

  // Calculate Total Price
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  // Brings in data from global state (Redux store)
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  // Cause a side-effect when the component loads
  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`)
    }
  }, [history, success, order])

  // PlaceOrder function
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <main className='placeOrderScreen'>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='placeOrderScreen__content'>
        {/* PlaceOrder Details */}
        <div className='placeOrderScreen__orderDetails'>
          <div className='orderDetails-shippingAddress'>
            <p className='title'>Shipping</p>
            <p className='orderDetails-content'>
              <strong>Address:</strong>{' '}
              <span>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}.
              </span>
            </p>
          </div>
          <div className='orderDetails-paymentMethod'>
            <p className='title'>Payment Method</p>
            <p className='orderDetails-content'>
              <strong>Method:</strong> <span> {cart.paymentMethod}</span>
            </p>
          </div>
          <div className='orderDetails-orderItems'>
            <p className='title'>Order Items</p>
            {cart.cartItems.length === 0 ? (
              <Message msg={`Your cart is empty`} messageType={'info'} />
            ) : (
              <div className='orderItems'>
                {cart.cartItems.map((item, index) => (
                  <div key={index} className='orderItem-item'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='orderItem-item-image'
                    />
                    <Link to={`/product/${item.product}`}>
                      <p className='orderItem-item-name'>{item.name}</p>
                    </Link>
                    <p className='orderItem-item-price'>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* PlaceOrder Summary */}
        <div className='placeOrderScreen__orderSummary'>
          <table>
            <thead>
              <tr>
                <th colSpan='2'>ORDER SUMMARY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Items</td>
                <td>${cart.itemsPrice}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>${cart.shippingPrice}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>${cart.taxPrice}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>${cart.totalPrice}</td>
              </tr>
              <tr>
                <td colSpan='2'>
                  <button
                    className='placeOrderScreen__orderSummary-btn'
                    type='button'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default PlaceOrderScreen
