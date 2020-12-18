import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/CartScreen.css'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  // const product = products.find(p => p._id === match.params.id)

  // Gets the product ID from the URL
  const productId = match.params.id

  // Checks for the quantity selected in the URL
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  // Calls/Invokes an action
  const dispatch = useDispatch()

  // Brings in Data from the global state (Redux Store)
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  // Remove Item from cart function
  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
    history.push('/cart')
  }

  return (
    <main className='cartScreen'>
      <div className='cartScreen__content'>
        <div className='cartScreen__content-title'>
          <p>SHOPPING CART</p>
        </div>
        <div className='cartScreen__content-prods'>
          {cartItems?.map(item => (
            <div key={item.product} className='cartScreen__content-prods-item'>
              <img
                src={item.image}
                alt={item.name}
                className='cartScreen__content-prods-item-img'
              />
              <Link to={`/product/${item.product}`}>
                <p className='cartScreen__content-prods-item-title'>
                  {item.name}
                </p>
              </Link>
              <p className='cartScreen__content-prods-item-price'>
                ${item.price}
              </p>
              <div className='cartScreen__content-prods-item-qty'>
                <select
                  id='qty'
                  value={item.qty}
                  onChange={e =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                  className='qty-padding'
                >
                  {[...Array(item.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className='cartScreen__content-prods-item-btn'>
                <i
                  className='del fas fa-trash'
                  onClick={() => removeFromCartHandler(item.product)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='cartScreen__checkout'>
        <table>
          <tbody>
            <tr>
              <td>
                <p className='cartScreen__checkout-title'>
                  SUBTOTAL (
                  {cartItems?.reduce((acc, item) => acc + item.qty, 0)}) ITEMS
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className='cartScreen__checkout-price'>
                  $
                  {cartItems
                    ?.reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <button className='cartScreen__checkout-btn'>
                  PROCEED TO CHECKOUT
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default CartScreen
