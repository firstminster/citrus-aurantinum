import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/UserEditScreen.css'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { getUserDetails, updateUser } from '../actions/userActions'
import Spinner from '../components/Spinner'
import { Message } from '@material-ui/icons'

const UserEditScreen = ({ history }) => {
  // Extract the ID from the URL
  const id = useParams()
  const userId = id.id

  // Initialize the state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  // Calls/Invoke an action
  const dispatch = useDispatch()

  // Brings in Date from global state (Redux Store)
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  // Brings in Date from global state (Redux Store)
  const userUpdate = useSelector(state => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    }
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user, userId, dispatch, successUpdate, history])

  // Submit Handler
  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    )
  }

  return (
    <main className='userEditScreen'>
      <Link to='/admin/userlist' className='btn btn-light'>
        Go Back
      </Link>
      <div className='userEditScreen__layout'>
        <p className='title'>Edit User</p>
        {loadingUpdate && <Spinner />}
        {errorUpdate && <Message msg={errorUpdate} messageType='danger' />}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message msg={error} messageType='danger' />
        ) : (
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
            <div className='userEditScreen__checkbox'>
              <input
                type='checkbox'
                id='isAdmin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              />
              <label htmlFor='isAdmin'>Is Admin</label>
            </div>
            <button type='submit'>Update</button>
          </form>
        )}
      </div>
    </main>
  )
}

export default UserEditScreen
