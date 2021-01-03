import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/LoginScreen.css'
import { login, register } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const containerRef = useRef(null)

  // Login Initial state
  const loginEmail = useRef('')
  const loginPassword = useRef('')

  // Register Initial state
  const registerName = useRef('')
  const registerEmail = useRef('')
  const registerPassword = useRef('')
  const registerConfirmPassword = useRef('')

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

  // Brings in Data from the global state (Redux Store)
  const userRegister = useSelector(state => state.userRegister)
  const {
    loading: loadingRegister,
    error: errorRegister,
    userInfo: userInfoRegister,
  } = userRegister

  // Checks for Redirect
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // Cause a side-effect when the component loads
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  // User login handler
  const loginSubmitHandler = e => {
    e.preventDefault()

    dispatch(login(loginEmail.current.value, loginPassword.current.value))
    // setLoginEmail('')
    // setLoginPassword('')
  }

  // User register Handler
  const registerSubmitHandler = e => {
    if (
      registerPassword.current.value !== registerConfirmPassword.current.value
    ) {
      alert('Password do not match')
    } else {
      dispatch(
        register(
          registerName.current.value,
          registerEmail.current.value,
          registerPassword.current.value
        )
      )
    }

    e.preventDefault()
  }

  return (
    <main className='loginScreen'>
      <div className='container' id='container' ref={containerRef}>
        <div className='form-container sign-up-container'>
          <form onSubmit={registerSubmitHandler}>
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
            <input type='text' placeholder='Name' ref={registerName} />
            <input type='email' placeholder='Email' ref={registerEmail} />
            <input
              type='password'
              placeholder='Password'
              ref={registerPassword}
            />
            <input
              type='password'
              placeholder='Confirm password'
              ref={registerConfirmPassword}
            />
            <button type='submit'>Sign Up</button>
          </form>
        </div>
        <div className='form-container sign-in-container'>
          <form action='#' onSubmit={loginSubmitHandler}>
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
              ref={loginEmail}
              // value={loginEmail}
              // onChange={e => setLoginEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              ref={loginPassword}
              // value={loginPassword}
              // onChange={e => setLoginPassword(e.target.value)}
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
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                <button className='ghost' id='signIn' onClick={signinAnimate}>
                  Sign In
                </button>
              </Link>
            </div>

            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                <button className='ghost' id='signUp' onClick={signupAnimate}>
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginScreen
