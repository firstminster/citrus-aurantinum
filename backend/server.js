import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

// Initialize DotEnv
dotenv.config()

// Connect Database
connectDB()

// Initialize express
const app = express()

// First Middleware before response is sent
// app.use((req, res, next) => {
//   console.log(req.originalUrl)
//   next()
// })

// GET Route
app.get('/', (req, res) => {
  res.send('API is Running...')
})

// Routes Middleware
app.use('/api/products', productRoutes)

// Error Middleware - (Invalid routes/url)
app.use(notFound)

// Error Middleware - (Error Handler)
app.use(errorHandler)

// Initialize port
const PORT = process.env.PORT || 5000

// listen on port 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
