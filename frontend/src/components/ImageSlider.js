import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider'
import slideImages from '../slideData'
import '../styles/ImageSlider.css'

const ImageSlider = () => {
  return (
    <div className='slider'>
      <SimpleImageSlider
        className='slider__image'
        style={{
          margin: '0 auto',
          marginTop: '80px',
        }}
        width={896}
        height={504}
        images={slideImages}
        useGPURender={true}
        showNavs={true}
        showBullets={false}
        navStyle={1}
        slideDuration={0.5}
      />
    </div>
  )
}

export default ImageSlider
