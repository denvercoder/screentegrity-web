import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Profile from './Profile'

class ProfileCharges extends Component {
  render() {
    const { profile } = this.props

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Charge History</h3>
          {profile.charges.length > 0 ? (
            <ul className="list-group">{profile.charges}</ul>
          ) : (
            <p className="text-center">No History Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Charge History</h3>
          {profile.charges.length > 0 ? (
            <ul className="list-group">{profile.charges}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    )
  }
}

ProfileCharges.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileCharges
