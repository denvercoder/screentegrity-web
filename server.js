const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const jwt = require('jsonwebtoken')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const User = require('./models/User')
const logger = require('heroku-logger')

const app = express()

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').DATABASE
const keys = require('./config/keys')

const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf'

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

// Serve Static Assets if Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.get('/api/confirmation/:token', async (req, res) => {
  logger.info('Starting confirmation')
  try {
    const {
      newUser: { id },
    } = jwt.verify(req.params.token, EMAIL_SECRET)

    await User.findOneAndUpdate({ _id: id }, { $set: { confirmed: true } })
    logger.info('Database updated')
  } catch (e) {
    res.send('error')
    console.log(e)
  }
  logger.info('Starting redirect')
  return res.redirect(`${keys.BASE_CLIENT_URL}/login`)
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Listening on port', PORT))
