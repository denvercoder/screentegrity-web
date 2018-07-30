const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

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

app.get('/', (req, res) => {
  res.send('It works again!!!!')
})

// Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Listening on port', PORT))
