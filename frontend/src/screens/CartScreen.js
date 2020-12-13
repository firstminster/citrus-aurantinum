import React from 'react'
import '../styles/CartScreen.css'
import products from '../productsData.js'

const CartScreen = ({ match }) => {
  // const product = products.find(p => p._id === match.params.id)

  const removeFromCartHandler = () => {
    console.log('Remove product')
  }
  return (
    <main className='cartScreen'>
      <div className='cartScreen__content'>
        <div className='cartScreen__content-title'>
          <p>SHOPPING CART</p>
        </div>
        <div className='cartScreen__content-prods'>
          {products.map(product => (
            <div key={product._id} className='cartScreen__content-prods-item'>
              <img
                src={product.image}
                alt={product.name}
                className='cartScreen__content-prods-item-img'
              />
              <p className='cartScreen__content-prods-item-title'>
                {product.name}
              </p>
              <p className='cartScreen__content-prods-item-price'>
                ${product.price}
              </p>
              <div className='cartScreen__content-prods-item-qty'>
                <select id='qty' value={0} onChange={0} className='qty-padding'>
                  {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className='cartScreen__content-prods-item-btn'>
                <i
                  className='del fas fa-trash'
                  onClick={() => removeFromCartHandler()}
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
                <p className='cartScreen__checkout-title'>SUBTOTAL (2) ITEMS</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className='cartScreen__checkout-price'>$total price</p>
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
