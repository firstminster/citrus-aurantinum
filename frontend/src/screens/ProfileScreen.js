import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/ProfileScreen.css'
import Spinner from '../components/Spinner'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import Message from '../components/Message'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Calls/Invoke an action
  const dispatch = useDispatch()

  // Brings in Date from global state (Redux Store)
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  // Brings in Date from global state (Redux Store)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // Brings in Date from global state (Redux Store)
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  // Brings in Date from global state (Redux Store)
  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  // Cause a side-effect when the componet loads
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  // Submit method/function
  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      // setMessage('Password do not match')
      alert('Password do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <main className='profileScreen'>
      <div className='profileScreen__user'>
        <p className='title'>User Profile</p>
        {loading && <Spinner />}
        <div className='profileScreen__formContainer'>
          <form onSubmit={submitHandler}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor='comfirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='comfirmPassword'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button type='submit'>Update</button>
          </form>
        </div>
      </div>

      <div className='profileScreen__orders'>
        <p className='title'>My Orders</p>
        {loadingOrders ? (
          <Spinner />
        ) : errorOrders ? (
          <Message>{errorOrders}</Message>
        ) : (
          <div className='profileScreen__orders-table'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.subtring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/orders/${order._id}`}>
                        <button className='profileScreen__orders-btn'>
                          Detials
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

export default ProfileScreen
