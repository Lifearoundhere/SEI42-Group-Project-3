import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

import dietaryData from '../../../db/data/dietaryData'
import cuisineData from '../../../db/data/cuisineTypeData'



class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dishes: [],
      cuisine: '',
      dietary: '',
      keyupValue: '',
      sortTerm: 'price|asc'

    }
    this.handleKeyUpChange = this.handleKeyUpChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }
  handleKeyUpChange(e) {
    this.setState({ keyupValue: e.target.value })
    console.log(e.target.value)
  }

  handleSelectChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log([e.target.name])
  }

  componentDidMount() {
    axios.get('/api/dishes')
      .then(res => this.setState({ dishes: res.data }))

  }
  filterDishes() {
    const [field, order] = this.state.sortTerm.split('|')
    const regex = new RegExp(this.state.keyupValue, 'i')
    const filtered = _.filter(this.state.dishes, dish => {
      return regex.test(dish.name) || dish.dietary === this.state.dietary || dish.cuisineType === this.state.cuisine
    })
    const sorted = _.orderBy(filtered, [field], [order])

    return sorted
  }

  render() {
    console.log(this.filterDishes())
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
                      <input className="input" type="text" placeholder="Ethiopian" onKeyUp={this.handleKeyUpChange} />
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Dietary</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select name="dietary" onChange={this.handleSelectChange}>
                          {dietaryData.map(({ value, label }, index) => <option key={index} value={value} >{label}</option>)}
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
                        <select name="cuisine" onChange={this.handleSelectChange}>
                          {cuisineData.map(({ value, label }, index) => <option key={index} value={value} >{label}</option>)}
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
                        <select name="sortTerm" onChange={this.handleSelectChange}>
                          <option>price|asc</option>
                          <option>price|desc</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            <div className="column">
              {this.filterDishes().map(dish =>
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
