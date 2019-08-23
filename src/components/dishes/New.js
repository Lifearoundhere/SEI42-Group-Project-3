import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import StarRatings from 'react-star-ratings'
import ImgUploader from '../common/imgUploader'
import Map from '../common/MapBox'
import Select from 'react-select'
import tags from '../../../db/data/TagData'
import dietary from '../../../db/data/dietaryData'
import cuisineTypes from '../../../db/data/cuisineTypeData'

class DishNew extends React.Component {


  constructor() {
    super()
    this.state = {
      formData: {
        comments: {
          overall: 1,
          fullness: 1,
          healthiness: 1
        },
        longitude: 0.0722,
        latitude: 51.5153,
        imgUploadData: {}

      },
      imgUploadData: {},
      errors: {},
      tempLocation: {
        longitude: 0.0722,
        latitude: 51.5153
      }
    }

    this.handleUpload = this.handleUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOverallChange = this.handleOverallChange.bind(this)
    this.handleFullnessChange = this.handleFullnessChange.bind(this)
    this.handleHealthinessChange = this.handleHealthinessChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleDietaryChange = this.handleDietaryChange.bind(this)
    this.handleCuisineChange = this.handleCuisineChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleMapDrag = this.handleMapDrag.bind(this)
  }



  handleTagChange(selectedTags) {
    const formData = { ...this.state.formData, tags: (selectedTags || []).map(option => option.value) }
    this.setState({ formData })
  }
  handleDietaryChange(selectedTags) {
    const formData = { ...this.state.formData, dietary: (selectedTags || []).map(option => option.value) }
    this.setState({ formData })
  }
  handleCuisineChange(selectedTags) {
    const formData = { ...this.state.formData, cuisineType: selectedTags.value }
    this.setState({ formData })
  }

  handleUpload(imageData) {
    const formData = { ...this.state.formData, image: (imageData.filesUploaded || []).map(option => option.url) }
    this.setState({ formData })
    this.setState({ imageMessage: 'image upload suceess...' })
  }
  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }


  handleOverallChange(e) {
    const comments = { ...this.state.formData.comments, overall: e }
    const formData = { ...this.state.formData, comments }
    this.setState({ formData })
  }

  handleFullnessChange(e) {
    const comments = { ...this.state.formData.comments, fullness: e }
    const formData = { ...this.state.formData, comments }
    this.setState({ formData })
  }

  handleHealthinessChange(e) {
    const comments = { ...this.state.formData.comments, healthiness: e }
    const formData = { ...this.state.formData, comments }
    this.setState({ formData })
  }




  handleMapDrag(val) {
    let formData = { ...this.state.formData, latitude: val.latitude }
    this.setState({ formData })
    formData = { ...this.state.formData, longitude: val.longitude }
    this.setState({ formData })
  }


  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()
    axios.post(('/api/dishes'), this.state.formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/dishes'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  render() {
    console.log(this.state.formData)
    const { name, price, nativeName, cuisineType } = this.state.errors
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
              {name && <small className="help is-danger">{name}</small>}
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
              {nativeName && <small className="help is-danger">{nativeName}</small>}
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
              {price && <small className="help is-danger">{price}</small>}
            </div>
            <div className="field">
              <label className="label">Location</label>
              <Map location={this.state.tempLocation} onDragged={this.handleMapDrag} />
            </div>
            <div className="field">
              <label className="label">Cuisine type</label>
              <Select
                name="cuisineType"
                options={cuisineTypes}
                placeholder="eg: American, Ethiopian etc..."
                onChange={this.handleCuisineChange}
                className="basic-select"
                classNamePrefix="select"
              />
              {cuisineType && <small className="help is-danger">{cuisineType}</small>}
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
            </div>
            <div className="field">
              <div className="file is-info is-medium">
                <ImgUploader parentCallback={this.handleUpload} />
                {this.state.imageMessage && <div className="help is-info is-medium">{this.state.imageMessage}</div>}
              </div>
            </div>
            <div className="field">
              <label className="label">Overall rating</label>
              <StarRatings
                rating={this.state.formData.comments.overall}
                starRatedColor="#6258ff"
                changeRating={this.handleOverallChange}
                numberOfStars={5}
                name="overall"
              />
            </div>
            <div className="field">
              <label className="label">How Fulling did was the dish?</label>
              <StarRatings
                rating={this.state.formData.comments.fullness}
                starRatedColor="#feba74"
                changeRating={this.handleFullnessChange}
                numberOfStars={5}
                name='rating'
              />
            </div>
            <div className="field">
              <label className="label">How healthy the dish was?</label>
              <StarRatings
                rating={this.state.formData.comments.healthiness}
                starRatedColor="#4f994f"
                changeRating={this.handleHealthinessChange}
                numberOfStars={5}
                name='rating'
              />
            </div>
            <button className="button">Add your dish</button>
          </form>
        </div>
      </section>
    )
  }
}

export default DishNew
