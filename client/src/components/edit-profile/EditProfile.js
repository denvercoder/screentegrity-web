import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'
import { Link } from 'react-router-dom'

class CreateProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      charges: ' ',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile

      const skillsCSV = profile.skills.join(',')

      profile.company = !isEmpty(profile.company) ? profile.company : ''
      profile.website = !isEmpty(profile.website) ? profile.website : ''
      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.charges = !isEmpty(profile.charges) ? profile.charges : ''
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : ''
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : ''
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : ''
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : ''
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : ''

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        charges: profile.charges,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      charges: this.state.charges,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    }

    this.props.createProfile(profileData, this.props.history)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors, displaySocialInputs } = this.state

    let socialInputs

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      )
    }

    const options = [
      { label: '* Select Status', value: 0 },
      { label: 'Employed Full-Time', value: 'Employed Full-Time' },
      { label: 'Employed Part-Time', value: 'Employed Part-Time' },
      { label: 'Self-Employed Full-Time', value: 'Self-Employed Full-Time' },
      { label: 'Self-Employed Part-Time', value: 'Self-Employed Part-Time' },
      { label: 'Unemployed', value: 'Unemployed' },
      { label: 'Other', value: 'Other' },
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your Profile URL. Your name, company name, or nickname."
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Your current Status"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Most recent company"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your personal website, if you have one."
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your current or preferred work location"
                />
                <TextFieldGroup
                  placeholder="* Skills, (ie, carpentry, woodworking, machine operator)"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="List out your work skills, (separate items with a comma)"
                />
                <TextFieldGroup
                  placeholder="Charges"
                  name="charges"
                  value={this.state.charges}
                  onChange={this.onChange}
                  error={errors.charges}
                  info="If you would like to explain your history, do so here. This section is optional."
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us about yourself. Really sell it!"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }))
                    }
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">(Optional)</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile },
)(withRouter(CreateProfile))
