import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import StarRatings from 'react-star-ratings'


import Select from 'react-select'
import tags from '../../../db/data/TagData'

class DishEdit extends React.Component {


  constructor() {
    super()
    this.state = {
      formData: {
        ratings: {
          overall: 1,
          fullness: 1,
          healthiness: 1
        }

      },
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOverallChange = this.handleOverallChange.bind(this)
    this.handleFullnessChange = this.handleFullnessChange.bind(this)
    this.handleHealthinessChange = this.handleHealthinessChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/dishes/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }



  handleTagChange(selectedTags) {
    const formData = { ...this.state.formData, tags: (selectedTags || []).map(option => option.value) }
    this.setState({ formData })
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleOverallChange(e) {
    const ratings = { ...this.state.formData.ratings, overall: e}
    const formData = { ...this.state.formData, ratings }
    this.setState({ formData })
  }
  handleFullnessChange(e) {
    const ratings = { ...this.state.formData.ratings, fullness: e}
    const formData = { ...this.state.formData, ratings }
    this.setState({ formData })
  }
  handleHealthinessChange(e) {
    const ratings = { ...this.state.formData.ratings, healthiness: e}
    const formData = { ...this.state.formData, ratings }
    this.setState({ formData })
  }


  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()
    axios.put((`/api/dishes/${this.props.match.params.id}`), this.state.formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => this.props.history.push(`/dishes/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))

  }

  render() {
    console.log(this.state.formData.ratings.overall)
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                placeholder="eg: Burger"
                value={this.state.formData.name || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>

            <div className="field">
              <label className="label">Natvie name</label>
              <input
                className="input"
                name="nativeName"
                placeholder="eg: Hamburger"
                value={this.state.formData.nativeName || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.nativeName && <small className="help is-danger">{this.state.errors.nativeName}</small>}
            </div>

            <div className="field">
              <label className="label">Price</label>
              <input
                className="input"
                name="price"
                placeholder="eg: 4"
                value={this.state.formData.price || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.price && <small className="help is-danger">{this.state.errors.price}</small>}
            </div>

            <div className="field">
              <label className="label">Latitude - just for it to work now</label>
              <input
                className="input"
                name="latitude"
                placeholder="eg: 51.507351"
                value={this.state.formData.latitude || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.latitude && <small className="help is-danger">{this.state.errors.latitude}</small>}
            </div>

            <div className="field">
              <label className="label">Longitude - just for it to work now</label>
              <input
                className="input"
                name="longitude"
                placeholder="eg: -0.127758"
                value={this.state.formData.longitude || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.longitude && <small className="help is-danger">{this.state.errors.longitude}</small>}
            </div>


            <div className="field">
              <label className="label">Cuisine type</label>
              <input
                className="input"
                name="cuisineType"
                placeholder="eg: American, Ethiopian etc... If you want to add more than one please seperate them by comma (,)"
                value={this.state.formData.cuisineType || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.cuisineType && <small className="help is-danger">{this.state.errors.cuisineType}</small>}
            </div>

            <h1>Image uploader</h1>

            <div className="field">
              <label className="label">Overall rating</label>

              <StarRatings
                rating={this.state.formData.ratings.overall}
                starRatedColor="blue"
                changeRating={this.handleOverallChange}
                numberOfStars={5}
                name="overall"
              />
              {this.state.errors.overall && <small className="help is-danger">{this.state.errors.overall}</small>}
            </div>

            <div className="field">
              <label className="label">How Fulling did was the dish?</label>
              <h3 className="title is-5">Fullness</h3>
              <StarRatings
                rating={this.state.formData.ratings.fullness}
                starRatedColor="orange"
                changeRating={this.handleFullnessChange}
                numberOfStars={5}
                name='rating'
              />
              {this.state.errors.fullness && <small className="help is-danger">{this.state.errors.fullness}</small>}
            </div>
            <div className="field">
              <label className="label">How healthy the dish was?</label>
              <StarRatings
                rating={this.state.formData.ratings.healthiness}
                starRatedColor="yellow"
                changeRating={this.handleHealthinessChange}
                numberOfStars={5}
                name='rating'
              />
              {this.state.errors.healthiness && <small className="help is-danger">{this.state.errors.healthiness}</small>}
            </div>
            <button className="button">Add your comments and ratings</button>
          </form>

          <Select
            isMulti
            name="cuisine"
            options={tags}
            onChange={this.handleTagChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      </section>

    )
  }

}

export default DishEdit
