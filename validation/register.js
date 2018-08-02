const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  if (!Validator.isLength(data.name, { min: 2, max: 32 })) {
    errors.name = 'Name must be between 2 and 32 characters'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field cannot be blank.'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field cannot be blank.'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid Email'
  }

  if (!Validator.isLength(data.password, { min: 8, max: 50 })) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field cannot be blank.'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field cannot be blank.'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Confirm Password and Password did not match.'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
