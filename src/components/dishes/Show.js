import React from 'react'
import axios from 'axios'
import ImgSlider from '../common/imgSlider'
import { Link } from 'react-router-dom'


import Ratings2 from '../common/Ratings2'
import Comment from '../common/Comment'
// import StarRatings from 'react-star-ratings'
import MapComp from '../common/Map'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'



class DishShow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }

  }

  componentDidMount() {
    axios.get(`/api/dishes/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ dish: res.data })
      })

  }



  // <h3 className="title is-5">Overall Rating</h3>
  // <StarRatings
  // rating={overall}
  // starDimension="40px"
  // starSpacing="15px"
  // starRatedColor="orange"
  // />
  // <h3 className="title is-5">Fullness</h3>
  // <StarRatings
  // rating={fullness}
  // starDimension="40px"
  // starSpacing="15px"
  // starRatedColor="red"
  // />
  // <h3 className="title is-5">Healthiness</h3>
  // <StarRatings
  // rating={healthiness}
  // starDimension="40px"
  // starSpacing="15px"
  // starRatedColor="green"
  // />
  // const {fullness, overall, healthiness} = this.state.ratings

  // overall={this.state.dish.comments[0].ratings[0].overall}
  // ratings={comment.ratings[0]}

  render() {
    if(!this.state.dish) return null

    return (
      <section className="section ">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-full-desktop">
              <Link to={`/dishes/${this.props.match.params.id}/comments`} className="button is-primary">
                <strong>I ate this!</strong>
              </Link>

            </div>

            <div className="column is-half-desktop">

              <ImgSlider images={this.state.dish.image} />

            </div>
            <div className="column is-half-desktop">
              <div className="columns is-multiline">
                <h2 className="column is-half-desktop title is-2">{this.state.dish.name}</h2>
                <h2 className="column is-half-desktop title is-2">£ {this.state.dish.price}</h2>
              </div>
              <div>
                <p>Ratings</p>
                <Ratings2
                  overall={this.state.dish.comments[0].overall}
                  fullness={this.state.dish.comments[0].fullness}
                  healthiness={this.state.dish.comments[0].healthiness}
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
              {this.state.dish.comments.map((comment) =>
                <Comment
                  key={comment._id}
                  user={comment.user}
                  content={comment.content}
                  overall={comment.overall}
                  fullness={comment.fullness}
                  healthiness={comment.healthiness}
                  createdAt={comment.createdAt}
                  userImage="https://www.placecage.com/c/200/300"
                />
              )}
            </div>

          </div>
        </div>
        <footer>
          <Link
            className="button"
            to={`/dishes/${this.state.dish._id}/edit`}
          >Edit</Link>
        </footer>
      </section>
    )
  }
}

export default DishShow
