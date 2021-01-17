import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import { IconButton } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { makeStyles } from '@material-ui/core/styles'
import { logout } from '../actions/userActions.js'
import { AdminMenuItems } from './MenuItems'
import UseDetectOutsideClick from './UseDetectOutsideClick'

const useStyles = makeStyles({
  root: {
    color: 'white',
  },
})

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge)

const Navbar = () => {
  const classes = useStyles()

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click) // Set click to true
  const closeMobileMenu = () => setClick(false) // Set click to false

  const adminDropdownRef = useRef(null)
  const adminUserDropdownRef = useRef(null)
  const [isAdminActive, setIsAdminActive] = UseDetectOutsideClick(
    adminDropdownRef,
    false
  )
  const [isAdminUserActive, setIsAdminUserActive] = UseDetectOutsideClick(
    adminUserDropdownRef,
    false
  )

  //Calls/Invoke an action
  const dispatch = useDispatch()

  // Brings in Data from the global state (Redux Store)
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  // Calculate the Total/Available Products/items in the cart
  const countProduct = cartItems?.length

  // Brings in Data from the global state (Redux Store)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // Logout Handler
  const logoutHandler = () => {
    dispatch(logout())
  }

  // Dropdown Handler
  const adminHandler = () => setIsAdminActive(!isAdminActive)
  const adminUserHandler = () => setIsAdminUserActive(!isAdminUserActive)

  return (
    <header className='navbar'>
      <Link to='/' className='navbar__logo'>
        CITRUS
        <FingerprintIcon className='navbar__logo-icon' />
      </Link>

      <div className='navbar__menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>

      <ul className={click ? 'navbar__menu active' : 'navbar__menu'}>
        <div className='navbar__search navbar__item' onClick={closeMobileMenu}>
          <input
            type='text'
            className='navbar__search-Input'
            placeholder='Search Products...'
          />
          <Search className='navbar__search-Icon' />
        </div>
        {userInfo && userInfo.isAdmin && (
          <li className='navbar__item' onClick={adminHandler}>
            <Link to='#'>
              <span className='navbar__item-username'>
                Setting
                <i className='fas fa-caret-down' />
              </span>
            </Link>
            <nav
              ref={adminDropdownRef}
              className={`menu ${isAdminActive ? 'active' : 'inactive'}`}
            >
              <ul>
                {AdminMenuItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        className={item.cName}
                        to={item.path}
                        // onClick={logoutHandler()}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </li>
        )}
        {userInfo ? (
          <>
            <li className='navbar__item' onClick={adminUserHandler}>
              <Link to='#'>
                <span className='navbar__item-username'>
                  {userInfo?.name.split(' ')[0]}{' '}
                  <i className='fas fa-caret-down' />
                </span>
              </Link>
              <nav
                ref={adminUserDropdownRef}
                className={`menu ${isAdminUserActive ? 'active' : 'inactive'}`}
              >
                <ul>
                  {/* {AdminUserMenuItems.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          className={item.cName}
                          to={item.path}
                          // onClick={logoutHandler()}
                        >
                          {item.title}
                        </Link>
                      </li>
                    )
                  })} */}
                  <li className=''>
                    <Link className='dropdown-link' to='/profile'>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=' dropdown-link'
                      to='#'
                      onClick={logoutHandler}
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
              </nav>
            </li>
            {/* <li className='navbar__item'>
              <Link
                to='#'
                className='navbar__links-mobile'
                // onClick={logoutHandler}
              >
                LogOut
              </Link>
            </li> */}
          </>
        ) : (
          <>
            <li className='navbar__item'>
              <Link
                to='#'
                className='navbar__links navbar__item-categories'
                onClick={closeMobileMenu}
              >
                Categories <i className='fas fa-caret-down' />
              </Link>
            </li>
            <li className='navbar__item'>
              <Link
                to='/login'
                className='navbar__links-mobile'
                onClick={closeMobileMenu}
              >
                Log In
              </Link>
            </li>
          </>
        )}

        <li className='navbar__item'>
          <Link
            to='/cart'
            className='navbar__item-cart'
            onClick={closeMobileMenu}
          >
            <IconButton
              aria-label='cart'
              color='secondary'
              className={classes.root}
            >
              <StyledBadge badgeContent={countProduct} color='secondary'>
                <ShoppingCartIcon className='navbar__item-cart-icon' />
              </StyledBadge>
            </IconButton>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Navbar
