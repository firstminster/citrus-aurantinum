import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/ProductScreen.css'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(1)
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)

      setProduct(data)
    }

    fetchProduct()
  }, [match])

  // Add item to cart
  const addToCartHandler = () => {
    console.log('Add to cart')
  }

  return (
    <main className='productScreen'>
      <div className='productScreen__goback '>
        <Link to='/' className='btn btn-light'>
          GO BACK
        </Link>
      </div>
      <div className='productScreen__details'>
        <div className='productScreen__details-img'>
          <img src={product.image} alt={product.name} />
        </div>
        <div className='productScreen__details-description'>
          <div className='productScreen__details-description-name'>
            <p className=''>{product.name}</p>
          </div>
          <hr />
          <div className='productScreen__details-description-review'>
            <Rating
              value={product.rating}
              text={` ${product.numReviews} reviews`}
            />
          </div>
          <hr />
          <div className='productScreen__details-description-price'>
            <span className='strong-text'>Price: </span>{' '}
            <span> ${product.price}</span>
          </div>
          <hr />
          <div className='productScreen__details-description-desc'>
            <span className='strong-text'>Description: </span>{' '}
            <span> {product.description}</span>
          </div>
        </div>

        <div className='productScreen__summary'>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className='productScreen__summary-price'>
                    <span className='strong-text'>Price: </span>{' '}
                    <span>${product.price}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='productScreen__summary-status'>
                    <span className='strong-text'>Status: </span>{' '}
                    <span>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                {product.countInStock > 0 && (
                  <td>
                    <div className='productScreen__summary-qty'>
                      <label htmlFor='qty' className='strong-text'>
                        Qty:{' '}
                      </label>
                      <span>
                        <select
                          id='qty'
                          value={qty}
                          onChange={e => setQty(e.target.value)}
                          className='qty-padding'
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </span>
                    </div>
                  </td>
                )}
              </tr>
              <tr>
                <td>
                  <div className='productScreen__summary-addToCart'>
                    <button
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                      className='addToCart__button'
                    >
                      Add To Cart
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default ProductScreen
