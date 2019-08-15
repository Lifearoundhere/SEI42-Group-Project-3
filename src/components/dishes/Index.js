import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class Index extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get('/api/dishes')
      .then(res => this.setState({ dishes: res.data }))
  }


  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            {!this.state.dishes && < h2 className="title is-2"> Loading...</h2>}

            {this.state.dishes.map(dish =>
              <div className="columns" key={dish._id}>
                <Link to={`/dishes/${dish._id}`}>
                  <div className="card">
                    <div className="card-header">
                      <h2 className="card-header-title">{dish.name}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default Index
