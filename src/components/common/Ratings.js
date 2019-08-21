import React from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings'

class Ratings extends React.Component {


  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    axios.get(`/api/dishes/${this.props.metaData.match.params.id}`)
      .then(res => {
        this.setState( {dish: res.data, ratings: res.data.ratings[0] } )
      })

  }



  render() {
    if(!this.state.dish) return <h1>loading</h1>
    const {fullness, overall, healthiness} = this.state.ratings
    return (
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
    )
  }
}
