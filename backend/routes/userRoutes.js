import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import { body, validationResult } from 'express-validator'

// Define Routes Handler
// router.get('/', getProducts) OR
router
  .route('/')
  .post(
    [
      body('name', 'Name is required').not().isEmpty(),
      body('email', 'Please include a valid email').isEmail(),
      body(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
    registerUser
  )
  .get(protect, admin, getUsers)

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  authUser
)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
