import React, { useState, useEffect } from 'react'
import { Link, LInk, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const UserEditScreen = () => {
  const id = useParams()
  const userId = Number(id)

  return (
    <main>
      <Link to='/admin/userlist'>Go Back</Link>

      <form></form>
    </main>
  )
}

export default UserEditScreen
