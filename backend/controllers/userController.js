import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import { body, validationResult } from 'express-validator'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  // Destructure data from body
  const { email, password } = req.body

  // Gets the user
  const user = await User.findOne({ email })

  // Checks if user exists in the database
  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Invalid Credentials',
        },
      ],
    })
  }

  // Gets User compared-password
  const isMatch = await user.matchPassword(password)

  // Checks if Password matches with the User password in the database
  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Invalid Password',
        },
      ],
    })
  }

  // Checks if User exist and if password matches
  if (user && isMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  // Destructure data from Form body
  const { name, email, password } = req.body

  // Gets the user
  const userExists = await User.findOne({ email })

  // Checks if user exist
  if (userExists) {
    // res.status(400)
    // throw new Error('User already Exist')
    return res.status(400).json({
      errors: [
        {
          msg: 'User already exists',
        },
      ],
    })
  }

  // Save/Create a new user
  const user = await User.create({
    name,
    email,
    password,
  })

  // Returns the new user created as Json file
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, registerUser, getUserProfile }
