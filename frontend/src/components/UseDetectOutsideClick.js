import React, { useState, useEffect } from 'react' // eslint-disable-line no-unused-vars

const UseDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState)

  useEffect(() => {
    const pageClickEvent = e => {
      //  If the active element exist and is clicked outside
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive)
      }
    }

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent)
    }
    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [isActive, el])

  return [isActive, setIsActive]
}

export default UseDetectOutsideClick
