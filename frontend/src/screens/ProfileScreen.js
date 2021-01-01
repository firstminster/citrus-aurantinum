import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ProfileScreen.css'

const ProfileScreen = () => {
  return (
    <main className='profileScreen'>
      <div className='profileScreen__user'>
        <p className='title'>User Profile</p>
        <div className='profileScreen__formContainer'>
          <form action='#'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' placeholder='Name' />
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='Email' />
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' placeholder='Password' />
            <label htmlFor='comfirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='comfirmPassword'
              placeholder='Confirm password'
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
