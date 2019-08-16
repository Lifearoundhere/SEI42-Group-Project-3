import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth';

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      navbarOpen: false
    }
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }
  logout() {
    Auth.removeToken()
    console.log(this.props)
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/dishes" className="navbar-item">
              Index
            </Link>
          </div>
        </div>
        <div className="navbar-end">
          {Auth.isAuthenticated() && <a onClick={this.logout} className="navbar-item">Logout</a>}
          {Auth.isAuthenticated() && <p className="navbar-item">{Auth.getUserInfo()}</p>}
          <div className="navbar-item">
            <div className="buttons">
              {!Auth.isAuthenticated() && <Link to="/register" className="button is-primary">
                <strong>Sign up</strong>
              </Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="button is-light">
                Log in
              </Link>}
            </div>
          </div>
        </div>

      </nav>
    )
  }
}
export default withRouter(Navbar)
