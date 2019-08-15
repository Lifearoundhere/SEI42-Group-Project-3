import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Home
            </a>
            <a className="navbar-item">
              Index
            </a>
            <a className="navbar-item">
              Profile
            </a>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>

      </nav>
    )
  }
}
export default Navbar
