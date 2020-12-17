import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/LoginScreen.css'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const containerRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Adds the active panel to the class
  const signupAnimate = () => {
    containerRef.current.classList.add('right-panel-active')
  }
  // Removes the active panel from the class
  const signinAnimate = () => {
    containerRef.current.classList.remove('right-panel-active')
  }
  // Calls/Invoke an action
  const dispatch = useDispatch()

  // Brings in Data from the global state (Redux Store)
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  // Checks for Redirect
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // Cause a side-effect when the componet loads
  // useEffect(() => {
  //   if (userInfo) {
  //     history.push(redirect)
  //   }
  // }, [history, userInfo, redirect])

  // User login handler
  const submitHandler = e => {
    e.preventDefault()

    dispatch(login(email, password))
  }

  return (
    <main className='loginScreen'>
      <div className='container' id='container' ref={containerRef}>
        <div className='form-container sign-up-container'>
          <form action='#'>
            <h1>Create Account</h1>
            <div className='social-container'>
              <Link to='#' className='social'>
                <i className='fab fa-facebook-f'></i>
              </Link>
              <Link to='#' className='social'>
                <i className='fab fa-google-plus-g'></i>
              </Link>
              <Link to='#' className='social'>
                <i className='fab fa-linkedin-in'></i>
              </Link>
            </div>
            <span>or use your email for registration</span>
            <input type='text' placeholder='Name' />
            <input type='email' placeholder='Email' />
            <input type='password' placeholder='Password' />
            <button>Sign Up</button>
          </form>
        </div>
        <div className='form-container sign-in-container'>
          <form action='#' onSubmit={submitHandler}>
            <h1>Sign in</h1>
            <div className='social-container'>
              <Link to='#' className='social'>
                <i className='fab fa-facebook-f'></i>
              </Link>
              <Link to='#' className='social'>
                <i className='fab fa-google-plus-g'></i>
              </Link>
              <Link to='#' className='social'>
                <i className='fab fa-linkedin-in'></i>
              </Link>
            </div>
            <span>or use your account</span>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Link to='#'>Forgot your password?</Link>
            <button type='submit'>Sign In</button>
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className='ghost' id='signIn' onClick={signinAnimate}>
                Sign In
              </button>
            </div>

            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className='ghost' id='signUp' onClick={signupAnimate}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginScreen
