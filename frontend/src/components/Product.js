import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Product.css'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <div className='product__card'>
      <div className='product__card--image'>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className='product__card-container'>
        <div className='product__card-container-title'>
          <Link to={`/product/${product._id}`}>
            <p className='product__card-container-title-name'>{product.name}</p>
          </Link>
          <p className='product__card-container-title-usage'>
            {product.condition}
          </p>
        </div>
        <div className='product__card-container-title2'>
          <Rating
            className='product__card-container-title2'
            value={product.rating}
            text={` ${product.numReviews} reviews`}
          />
          {/* <p className='product__card-container-title2'>
            {'⭐⭐⭐⭐⭐ '} <span> {product.numReviews} reviews</span>
          </p> */}
          <p className='product__card-container-title2-price'>
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Product
