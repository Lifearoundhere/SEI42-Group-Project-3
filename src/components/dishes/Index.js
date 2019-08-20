import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'



class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dishes: []
    }
  }

  componentDidMount() {
    axios.get('/api/dishes')
      .then(res => this.setState({ dishes: res.data }))

  }


  render() {
    console.log(this.state.dishes)

    return (
      <section className="section">
        <div className="container">
          <div className="columns is-multiline is-full-desktop">
            {!this.state.dishes && < h2 className="title is-2"> Loading...</h2>}
            <div className="column is-full-desktop is-two-thirds-tablet">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label">Search</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Ethiopian" />
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Dietary</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select>
                          <option>None</option>
                          <option>Gluten/Coeliac</option>
                          <option>Dairy/lactose</option>
                          <option>Vegetarian</option>
                          <option>Vegan</option>
                          <option>Nut Allergies</option>
                          <option>Fish and shellfish</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Cuisine</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select>
                          <option>None</option>
                          <option>American</option>
                          <option>Cajun</option>
                          <option>Caribbean</option>
                          <option>Chinese</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Greek</option>
                          <option>Indian</option>
                          <option>Italian</option>
                          <option>Japanese</option>
                          <option>Korean</option>
                          <option>Lebanese</option>
                          <option>Mediterranean</option>
                          <option>Mexican</option>
                          <option>Moroccan</option>
                          <option>Soul</option>
                          <option>Spanish</option>
                          <option>Thai</option>
                          <option>Turkish</option>
                          <option>Vietnamese</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="field">
                    <label className="label">Sort</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select>
                          <option>Price|High-Low</option>
                          <option>Price|Low-High</option>
                          <option>Rating|High-Low</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            <div className="column">
              {this.state.dishes.map(dish =>
                <div className="columns" key={dish._id}>
                  <Link to={`/dishes/${dish._id}`}>
                    <div className="card">
                      <div className="card-header">
                        <h2 className="column is-half title">{dish.name} </h2>

                        <h2 className="column is-half title" > £{dish.price}</h2>
                      </div>

                      <div className="card-image">
                        <figure className="image">
                          <img src={dish.image} alt={dish.name} />
                        </figure>
                      </div>
                      <div className="columns is-multiline">
                        <div className="column title is-quarter">{dish.cuisineType} </div>

                        <div className="column title is-quarter">Dietary </div>


                        <div className="column title is-quarter">Overall Rating</div>
                        <StarRatings
                          className="column is-quarter"
                          rating={dish.comments[0].overall}
                          starDimension="40px"
                          starSpacing="15px"
                          starRatedColor="orange"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Index
