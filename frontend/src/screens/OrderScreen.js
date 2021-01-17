import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/OrderScreen.css'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  // Get id from the URL
  const orderId = match.params.id

  // Initialize state
  const [sdkReady, setSdkReady] = useState(false)

  // Call an action
  const dispatch = useDispatch()

  // Brings in data from the global state (Redux store)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // Brings in data from the global state (Redux store)
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  // Brings in data from the global state (Redux store)
  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  if (!loading && !error) {
    // Function that add two decimal to a value
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    // Calculate price of all items
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  // Fires when the component loads
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_CREATE_RESET })
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [userInfo, history, order, orderId, dispatch, successPay])

  // Payment function
  const successPaymentHandler = paymentResult => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  // Deliver function
  const deliverHandler = () => {
    console.log('deliverHandler')
  }

  // console.log(orderDetails)
  return loading ? (
    <Spinner />
  ) : error ? (
    <Message msg={error} messageType='danger' />
  ) : (
    <>
      <main className='orderScreen'>
        {/* Order Details */}
        <div className='orderScreen__Details'>
          <p className='orderscreen__title'>Order: {order._id}</p>
          <div className='orderScreen__shipDetails'>
            <p className='title'>Shipping</p>
            <p className='orderScreen__Details-content'>
              <strong>Name:</strong>{' '}
              <span className='orderScreen__name'>{order.user.name} </span>
            </p>
            <p className='orderScreen__Details-content'>
              <strong>Email:</strong>{' '}
              <span>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </span>
            </p>
            <p className='orderScreen__Details-content'>
              <strong>Address:</strong>{' '}
              <span>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country},
              </span>
            </p>
            {order.isDelivered ? (
              <Message msg={'Delivered on '} messageType={'success'}>
                {order.deliveredAt}
              </Message>
            ) : (
              <Message msg={'Not Delivered'} messageType={'danger'} />
            )}
          </div>
          <div className='orderScreen__payMethod'>
            <p className='title'>Payment Method</p>
            <p className='orderScreen__Details-content'>
              <strong>Method:</strong> <span> {order.paymentMethod}</span>
            </p>
            {order.isPaid ? (
              <Message msg={'Paid on '} messageType={'success'}>
                {order.paidAt}
              </Message>
            ) : (
              <Message msg={'Not Paid'} messageType={'danger'} />
            )}
          </div>
          <div className='orderScreen__orderItems'>
            <p className='title'>Order Items</p>
            {order.orderItems.length === 0 ? (
              <Message msg={`Order is empty`} messageType={'info'} />
            ) : (
              <div className='orderItems'>
                {order.orderItems.map((item, index) => (
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
                <td>${order.itemsPrice}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>${order.shippingPrice}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>${order.taxPrice}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>${order.totalPrice}</td>
              </tr>
              <tr>
                <td colSpan='2'>
                  {!order.isPaid && (
                    <>
                      {loadingPay && <Spinner />}
                      {!sdkReady ? (
                        <Spinner />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </>
                  )}
                  {/* <button
                    className='orderScreen__orderSummary-btn'
                    type='button'
                    onClick={deliverHandler()}
                  >
                    Mark As Delivered
                  </button> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default OrderScreen
