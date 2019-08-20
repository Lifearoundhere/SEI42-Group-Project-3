import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import StarRatings from 'react-star-ratings'
import Select from 'react-select'

class AddComment extends React.Component {


  constructor() {
    super()
    this.state = {
      imgUploadData: {},
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOverallChange = this.handleOverallChange.bind(this)
    this.handleFullnessChange = this.handleFullnessChange.bind(this)
    this.handleHealthinessChange = this.handleHealthinessChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload(imageData) {
    console.log('image upload suceess...', imageData)
    const formData = { ...this.state.formData, image: (imageData.filesUploaded || []).map(option => option.url) }
    this.setState({ formData })
  }
  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleOverallChange(e) {
    const ratings = { ...this.state.formData.ratings, overall: e }
    const formData = { ...this.state.formData, ratings }
    this.setState({ formData })
  }
  handleFullnessChange(e) {
    const ratings = { ...this.state.formData.ratings, fullness: e }
    const formData = { ...this.state.formData, ratings }
    this.setState({ formData })
  }
  handleHealthinessChange(e) {
    const ratings = { ...this.state.formData.ratings, healthiness: e }
    const formData = { ...this.state.formData, ratings }
    this.setState({ formData })
  }


  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()
    axios.post(('/api/dishes/:id/comments'), this.state.formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/dishes'))
      .catch(err => this.setState({ errors: err.response.data.errors }))

  }

  render() {
    console.log(this.state.formData)
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
              <label className="label">Native name</label>
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
              <Select
                name="cuisineType"
                options={cuisineType}
                placeholder="eg: American, Ethiopian etc..."
                onChange={this.handleCuisineChange}
                className="basic-select"
                classNamePrefix="select"
              />
              {this.state.errors.cuisineType && <small className="help is-danger">{this.state.errors.cuisineType}</small>}
            </div>

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

            <div className="field">
              <label className="label">Select tags</label>
              <Select
                isMulti
                name="tags"
                options={tags}
                onChange={this.handleTagChange}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              {this.state.errors.tags && <small className="help is-danger">{this.state.errors.tags}</small>}
            </div>
            <div className="field">
              <label className="label">Select dietary</label>
              <Select
                isMulti
                name="dietary"
                options={dietary}
                onChange={this.handleDietaryChange}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              {this.state.errors.dietary && <small className="help is-danger">{this.state.errors.dietary}</small>}
            </div>
            <div className="field">
              <div className="file is-info is-medium">
                <label className="file-label">
                  <button className="button is-info is-medium">
                    <ImgUploader parentCallback={this.handleUpload} />
                  </button>
                </label>
              </div>
            </div>
            <button className="button">Add your dish</button>
          </form>
        </div>
      </section>

    )
  }

}

export default AddComment
