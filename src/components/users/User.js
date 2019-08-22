import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'



class UserShow extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ user: res.data })
      })

  }

  render() {
    if (!this.state.user) return null
    return (
      <section className="section">
        <div className="container">
          <header><hr /></header>
          <div className="columns">
            <div className="column is-4">
              <div className="columns is-mobile">
                <div className="column">
                  <div className="box">
                    <div className="columns is-mobile">
                      <div className="column">
                        <figure className="image is-128x128 user-image">
                          <img className="is-rounded" src={this.state.user.img} alt="user-img" />
                        </figure>
                      </div>
                      <div className="column">
                        <h1>{this.state.user.username}</h1>
                      </div>
                    </div>
                  </div>
                  <h1 className="has-text-centered">{Auth.isAuthenticated() &&
                    <Link
                      className="button is-primary"
                      to={`/users/${this.state.user._id}/edit`}
                    >
                      Edit Profile
                    </Link>
                  }</h1>
                  <div className="column">
                    <div className="box">
                      {this.state.user.favfood.map(food =>
                        <span key={food}
                          className={`tag is-${food.split(' ')[0].toLowerCase()}`}
                        >{food}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns is-mobile">
                <div className="column is-1">
                  <h1><strong>{this.state.user.name}</strong></h1>
                </div>
                <div className="column">
                  <h1><strong>{this.state.user.lastname}</strong></h1>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-quarter">
                  <h1><strong>Contacts:</strong></h1><br />
                  <h2>Email:</h2>
                  <h2>Mobile:</h2>
                </div>
                <div className="column">
                  <br /><br />
                  <h2>{this.state.user.email}</h2>
                  <h2>{this.state.user.mobile}</h2>
                </div>
              </div>
              <hr />
              <div className="columns is-mobile">
                <div className="column is-one-quarter">
                  <h1><strong>Main Information:</strong></h1><br />
                  <h2>Country:</h2>
                  <h2>City:</h2>
                </div>
                <div className="column">
                  <br /><br />
                  <h2>{this.state.user.country}</h2>
                  <h2>{this.state.user.city}</h2>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column is-4 has-text-centered ">
              <div className="box">
                <h1><strong>Achievements:</strong></h1><br />
                <div className="columns is-4 is-multiline">
                  <figure className="column">
                    <svg height="64" viewBox="0 0 64 64" width="64" xmlns="http://www.w3.org/2000/svg"><g id="Fast_food" data-name="Fast food"><path d="m61 35-2 26h-28l-.46-6-1.54-20zm-8 17v-8h-16v8z" fill="#ff7956" /><path d="m57 27a4.02 4.02 0 1 1 -2.06.58 3.921 3.921 0 0 1 2.06-.58z" fill="#fee9ab" /><path d="m53 20a4 4 0 1 1 -4 4 4 4 0 0 1 4-4z" fill="#ffc477" /><path d="m54.9 27.52.04.06a3.97 3.97 0 0 0 -1.94 3.42 4 4 0 0 0 -8 0 4 4 0 0 0 -8 0 4 4 0 0 0 -7.46-2h-24.54a2.006 2.006 0 0 1 -2-2v-2a2.006 2.006 0 0 1 2-2h28.13a3.657 3.657 0 0 0 -.13 1 4 4 0 0 0 8 0 4 4 0 0 0 8 0 4 4 0 0 0 5.9 3.52z" fill="#ff7956" /><path d="m37 44h16v8h-16z" fill="#b2fa09" /><circle cx="49" cy="17" fill="#ffcd00" r="4" /><circle cx="49" cy="31" fill="#ffcd00" r="4" /><circle cx="45" cy="24" fill="#fee9ab" r="4" /><circle cx="41" cy="17" fill="#ffc477" r="4" /><circle cx="41" cy="31" fill="#ffc477" r="4" /><path d="m37 20a4 4 0 1 1 -4 4 3.657 3.657 0 0 1 .13-1 4 4 0 0 1 3.87-3z" fill="#ffcd00" /><path d="m33 27a4.01 4.01 0 1 1 -3.46 2 4 4 0 0 1 3.46-2z" fill="#fee9ab" /><path d="m34.98 20.55a3.967 3.967 0 0 0 -1.85 2.45h-26.13v-2a6 6 0 0 1 6-6h16a6 6 0 0 1 5.98 5.55z" fill="#fee9ab" /><path d="m33 3v4h-10v8h-4v-8a4 4 0 0 1 4-4z" fill="#46f8ff" /><path d="m33 35h-25.45l-.55-6h22.54a3.994 3.994 0 0 0 3.46 6z" fill="#fee9ab" /><path d="m30.54 55 .46 6h-22l-.55-6z" fill="#fee9ab" /><path d="m29 35 1.54 20h-22.09-1.45l-1-20h1.55z" fill="#ffb655" /><path d="m61 34h-.026a4.952 4.952 0 0 0 -3.428-7.945 4.954 4.954 0 0 0 -4-7 4.942 4.942 0 0 0 .454-2.055 4.985 4.985 0 0 0 -9-2.969 4.982 4.982 0 0 0 -8.546 5.024 5.042 5.042 0 0 0 -.7.121 7.031 7.031 0 0 0 -6.754-5.176h-5v-6h9a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1h-10a5.006 5.006 0 0 0 -5 5v7h-5a7.008 7.008 0 0 0 -7 7v1h-1a3 3 0 0 0 -3 3v2a3 3 0 0 0 3 3h1.088l.366 4h-.454a1 1 0 0 0 -1 1.05l1 20a1 1 0 0 0 1 .95h.538l.462 5.091a1 1 0 0 0 1 .909h50a1 1 0 0 0 1-.923l2-26a1 1 0 0 0 -1-1.077zm-1-3a3 3 0 1 1 -3-3 3 3 0 0 1 3 3zm-30 0a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm15-4a3 3 0 1 1 3-3 3 3 0 0 1 -3 3zm-5-3a3 3 0 1 1 -3-3 3 3 0 0 1 3 3zm-3 9.969c.008.011.017.02.026.031h-.052c.009-.011.018-.02.026-.031zm1-2.969a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm7 2.969c.008.011.017.02.026.031h-.052c.009-.011.018-.02.026-.031zm1-2.969a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm7 2.969c.008.011.017.02.026.031h-.052c.009-.011.018-.02.026-.031zm3-9.969a3 3 0 1 1 -3-3 3 3 0 0 1 3 3zm-7-10a3 3 0 1 1 -3 3 3 3 0 0 1 3-3zm-8 0a3 3 0 1 1 -3 3 3 3 0 0 1 3-3zm-21-7a3 3 0 0 1 3-3h9v2h-9a1 1 0 0 0 -1 1v7h-2zm-12 14a5.006 5.006 0 0 1 5-5h16a5 5 0 0 1 4.9 4.112 5.017 5.017 0 0 0 -1.476 1.888h-24.424zm-4 6v-2a1 1 0 0 1 1-1h27a4.942 4.942 0 0 0 .454 2.055 4.972 4.972 0 0 0 -3.428 1.945h-24.026a1 1 0 0 1 -1-1zm4.1 3h20a4.922 4.922 0 0 0 .925 4h-20.563zm19.978 6 1.385 18h-21.512l-.9-18zm-18.532 20h20.066l.308 4h-20.007zm48.528 4h-26.148l-1.846-24h29.84z" /><path d="m53 43h-16a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8a1 1 0 0 0 -1-1zm-1 8h-14v-6h14z" /></g></svg>
                    <h1>Beginner</h1>
                  </figure>
                </div>
              </div>
            </div>
            <div className="column">
              <h1><strong>Biography:</strong></h1><br />
              <h2>About me:</h2>
              <h2>{this.state.user.bio}</h2>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserShow
