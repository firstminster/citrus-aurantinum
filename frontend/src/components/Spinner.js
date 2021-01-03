import React from 'react'
import spinner from './spinner2.gif'

const Spinner = () => {
  return (
    <main>
      <img
        src={spinner}
        alt='Loading...'
        style={{ width: '100px', margin: 'auto', display: 'block' }}
      />
    </main>
  )
}

export default Spinner
