const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').DATABASE

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true },
  )
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Listening on port', PORT))
