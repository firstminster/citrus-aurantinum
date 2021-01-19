import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/UserListScreen.css'
import Spinner from '../components/Spinner'
import { Message } from '@material-ui/icons'
import { deleteUser, listUsers } from '../actions/userActions'

const UserListScreen = ({ history }) => {
  // Calls/Invoke an action
  const dispatch = useDispatch()

  // Brings in Date from global state (Redux Store)
  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  // Brings in Date from global state (Redux Store)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // Brings in Date from global state (Redux Store)
  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <main className='userlistScreen'>
      <div className='userlistScreen__users'>
        <p className='title'>Users</p>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message />
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='userlistScreen__btnFlex'>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <i className='fas fa-edit fa-2x userlistScreen__editBtn'></i>
                    </Link>
                    <button
                      className='userlistScreen__trashBtn'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash '></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}

export default UserListScreen
