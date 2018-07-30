const express = require('express')
const mongoose = require('mongoose')
const app = express()

// DB Config
const db = require('./config/keys').DATABASE

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('It works again!!!!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Listening on port', PORT))
