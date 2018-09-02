const nodemailer = require('nodemailer')
require('dotenv').config()

let transporter = nodemailer.createTransport({
  host: process.env.MG_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MG_USERNAME,
    pass: process.env.MG_PASSWORD,
  },
})

// setup email data with unicode symbols
let mailOptions = {
  from: '"Screentegrity" <support@screentegrity.com>', // sender address
  to: 'tim@denvercoder.com, tim.myers@screentegrity.com', // list of receivers
  subject: 'Please verify your Screentegrity Account', // Subject line
  text: 'Hello', // plain text body
  html: '<h2>Welcome to Screentegrity</h2>', // html body
}

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error)
  }
})
