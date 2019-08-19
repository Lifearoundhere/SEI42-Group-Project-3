import React from 'react'
import axios from 'axios'
import ImgSlider from '../common/imgSlider'

import StarRatings from 'react-star-ratings'


import MapComp from '../common/Map'


class DishShow extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    axios.get(`/api/dishes/${this.props.match.params.id}`)
      .then(res => {
        this.setState( {dish: res.data, ratings: res.data.ratings[0] } )
      })

  }


  render() {
    console.log(this.state)
    if(!this.state.dish) return null
    const {fullness, overall, healthiness} = this.state.ratings
    return (
      <section className="section ">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-half-desktop">

              <ImgSlider images={this.state.dish.image} />

            </div>
            <div className="column is-half-desktop">
              <div className="columns is-multiline">
                <h2 className="column is-half-desktop title is-2">{this.state.dish.name}</h2>
                <h2 className="column is-half-desktop title is-2">£ {this.state.dish.price}</h2>
              </div>
              <div>
                <h3 className="title is-5">Overall Rating</h3>
                <StarRatings
                  rating={overall}
                  starDimension="40px"
                  starSpacing="15px"
                  starRatedColor="orange"
                />
                <h3 className="title is-5">Fullness</h3>
                <StarRatings
                  rating={fullness}
                  starDimension="40px"
                  starSpacing="15px"
                  starRatedColor="red"
                />
                <h3 className="title is-5">Healthiness</h3>
                <StarRatings
                  rating={healthiness}
                  starDimension="40px"
                  starSpacing="15px"
                  starRatedColor="green"
                />

              </div>


            </div>
            <div className="column is-half-desktop">
              <MapComp latitude={this.state.dish.latitude} longitude={this.state.dish.longitude} />
            </div>
            <div className="column is-half-desktop">
              <p className="title is-3">Native Name: {this.state.dish.nativeName}</p>
              <p className="title is-3">Cuisine: {this.state.dish.cuisineType}</p>
            </div>
            <div className="column is-full-desktop">
              <h1>The comment component</h1>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DishShow
