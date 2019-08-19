import React from 'react'
import axios from 'axios'
import ImgSlider from '../common/imgSlider'

class DishShow extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get(`/api/dishes/${this.props.match.params.id}`)
      .then(res => this.setState( {dish: res.data }))
  }



  render() {
    if(!this.state.dish) return null
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

              <h1>Rating</h1>
            </div>
            <div className="column is-half-desktop">
              <h1>Here we will have a map</h1>
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
