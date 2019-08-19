import React from 'react'
import axios from 'axios'

import StarRatings from 'react-star-ratings'




// import Auth from '../../lib/Auth'



class Ratings extends React.Component {

  constructor(){
    super()
    this.state = {
      dish: {},
      ratings: {
        overall: 1,
        fullness: 1,
        healthiness: 1
      }
    }
  }

  componentDidMount() {


    axios.get(`/api/dishes/${this.props.match.params.id}`)
      .then(res => this.setState({ dish: res.data }))

  }
  //
  changeRating(e) {
    this.setState({
      ratings: {
        overall: e,
        fullness: e,
        healthiness: e
      }
    })
  }



  render (){
    if(!this.state.dish) return <h1>Loadins...</h1>
    console.log(this.state)
    return (
      <div className="container">
        <h3 className="title is-5">Overall Rating</h3>
        <StarRatings
          rating={this.state.dish.ratings}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        />
        <h3 className="title is-5">Fullness</h3>
        <StarRatings
          rating={this.state.fullness}
          starRatedColor="orange"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        />
        <h3 className="title is-5">Healthiness</h3>
        <StarRatings
          rating={this.state.healthiness}
          starRatedColor="yellow"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        />
      </div>

    )
  }
}


export default Ratings
