import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/ProfileScreen.css'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

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

  // Cause a side-effect when the componet loads
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
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
              <tr>
                <td>5fc1f6fdccbbc476e46f85eb</td>
                <td>2020-11-28</td>
                <td>1069.49</td>
                <td>2020-11-28</td>
                <td>2020-11-28</td>
                <td>
                  <Link to='#'>
                    <button className='profileScreen__orders-btn'>
                      Detials
                    </button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>5fc1f6fdccbbc476e46f85eb</td>
                <td>2020-11-28</td>
                <td>1069.49</td>
                <td>2020-11-28</td>
                <td>2020-11-28</td>
                <td>
                  <Link to='#'>
                    <button className='profileScreen__orders-btn'>
                      Detials
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default ProfileScreen
