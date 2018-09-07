const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const _ = require('lodash')
require('dotenv').config()

const router = express.Router()

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')
const keys = require('../../config/keys')

let transporter = nodemailer.createTransport({
  host: keys.MG_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: keys.MG_USERNAME,
    pass: keys.MG_PASSWORD,
  },
})

const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf'

// @route     POST api/users/register
// @desc      Register New User
// @access    Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //Size
        r: 'pg', //Rating
        d: 'mm', //Default
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      })

      try {
        const emailToken = jwt.sign(
          {
            newUser: _.pick(newUser, 'id'),
          },
          EMAIL_SECRET,
          {
            expiresIn: '1d',
          },
        )

        const url = `${keys.BASE_SERVER_URL}/api/confirmation/${emailToken}`

        transporter.sendMail({
          from: 'support@screentegrity.com',
          to: req.body.email,
          subject: 'Confirm Email',
          html: `Please click this email to confirm your email: <a href="${url}">Click Here To Verify Your Email</a>`,
        })
      } catch (e) {
        console.log(e)
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err

          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route     POST api/users/login
// @desc      Login User / Return JWT
// @access    Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }

    if (!user.confirmed) {
      errors.confirm = 'Please confirm your email to login'
      return res.status(403).json(errors)
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //generate token
        const payload = { id: user.id, name: user.name, avatar: user.avatar }
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '1d' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            })
          },
        )
      } else {
        errors.password = 'Password Incorrect'
        return res.status(400).json(errors)
      }
    })
  })
})

// @route     GET api/users/currentUser
// @desc      Return Current User
// @access    Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    })
  },
)

module.exports = router
