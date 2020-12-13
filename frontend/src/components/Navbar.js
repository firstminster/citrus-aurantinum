import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiOrangeSlice } from 'react-icons/gi'
import { IconButton } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { makeStyles } from '@material-ui/core/styles'
import '../styles/Navbar.css'

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

  return (
    <header className='navbar'>
      <Link to='/' className='navbar__logo'>
        CITRUS
        <GiOrangeSlice className='navbar__logo-icon' />
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
            Sign In
          </Link>
        </li>
        <li className='navbar__item'>
          <Link
            to='/cart'
            className='navbar__item-cart'
            onClick={closeMobileMenu}
          >
            {/* <ShoppingCart className='navbar__item-cart-icon' /> */}

            <IconButton
              aria-label='cart'
              color='secondary'
              className={classes.root}
            >
              <StyledBadge badgeContent={2} color='secondary'>
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
