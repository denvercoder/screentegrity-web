import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div>
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Screentegrity</h1>
                  <p className="lead"> A second chance to make a difference</p>
                  <hr />
                  <Link
                    to="/info-jobseekers"
                    className="btn btn-lg btn-info mr-2"
                  >
                    Job Seekers
                  </Link>
                  <Link to="/info-employers" className="btn btn-lg btn-light">
                    Employers
                  </Link>
                </div>
              </div>
              <div className="row">
                <h1 className="col-12 display-1 mt-5 text-center">
                  Coming Soon
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Landing)
