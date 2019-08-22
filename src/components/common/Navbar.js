import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Navbar extends React.Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
    this.state = {
      navbarOpen: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.logout = this.logout.bind(this)
  }
  logout() {
    Auth.removeToken()
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
      <nav className="navbar" id="footer">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">Home</Link>
            <a
              role="button"
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active': ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active': ''}`}>
            <div className="navbar-start">
              <Link to="/dishes" className="navbar-item">           Index</Link>
              {Auth.isAuthenticated() && <Link to="/dishes/new" className="navbar-item">Add a Dish</Link>}
            </div>
            <div className="navbar-end">
              {Auth.isAuthenticated() && <p className="navbar-item"> <Link to={`/users/${Auth.getPayload().sub}`}> Profile</Link></p>}
              {Auth.isAuthenticated() && <a onClick={this.logout} className="navbar-item">Logout</a>}
              {!Auth.isAuthenticated() && <Link to="/register" className="button is-primary"><strong>Sign up</strong></Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="button is-light">Log in</Link>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)
