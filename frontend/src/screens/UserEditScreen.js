import React, { useState, useEffect } from 'react'
import { Link, LInk, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/UserEditScreen.css'

const UserEditScreen = () => {
  // Extract the ID from the URL
  const id = useParams()
  const userId = Number(id)

  // Initialize the state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  // Calls/Invoke an action
  const dispatch = useDispatch()

  // Brings in Date from global state (Redux Store)
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  useEffect(() => {}, [])

  // Submit Handler
  const submitHandler = e => {
    e.preventDefault()
    console.log('UserEdited')
  }

  return (
    <main className='userEditScreen'>
      <Link to='/admin/userlist' className='btn btn-light'>
        Go Back
      </Link>
      <div className='userEditScreen__layout'>
        <p className='title'>Edit User</p>
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
      </div>
    </main>
  )
}

export default UserEditScreen
