import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

// Create express instnace
const app = express()

// Require API routes
const users = require('./routes/users')

// Import API Routes
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
