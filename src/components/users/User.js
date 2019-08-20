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
        this.setState( { user: res.data } )
      })

  }



  render() {
    if(!this.state.user) return null
    return (
      <section className="section ">
        <div className="container">
          <header>
            {Auth.isAuthenticated() && <div className="buttons">
              <Link
                className="button"
                to={`/users/${this.state.user._id}/edit`}
              ><button>Edit</button></Link>

            </div>}
            <hr />
          </header>
          <div className="columns">
            <div className="column">
              <figure className="image is-128x128">
                <img src={this.state.user.img} alt="user-img"/>
              </figure>
            </div>
            <div className="column">
              <h1>{this.state.user.username}</h1>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="columns">
            <div className="column">
              {this.state.user.favfood.map(food =>
                <div className="column" key={food}>
                  <span key={food}
                    className={`tag is-${food.split(' ')[0].toLowerCase()}`}
                  >{food}</span>
                </div>
              )}
            </div>
            <div className="column">
              <h1>{this.state.user.bio}</h1>
            </div>
            <div className="column">
              <h1>{this.state.user.achievements}achievements</h1>
            </div>
          </div>
        </div>
      </section>


    )
  }
}

export default UserShow
