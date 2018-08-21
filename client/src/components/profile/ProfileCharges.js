import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProfileCharges extends Component {
  render() {
    const { profile } = this.props

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mt-3">
            <h3 className="text-center text-info">Explanation of Charges</h3>
            <p className="lead">{profile.charges}</p>
          </div>
        </div>
      </div>
    )
  }
}

ProfileCharges.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileCharges
