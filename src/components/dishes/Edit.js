import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import ImgUploader from '../common/imgUploader'

import Select from 'react-select'
import tags from '../../../db/data/TagData'
import dietary from '../../../db/data/dietaryData'
import cuisineType from '../../../db/data/cuisineTypeData'

class DishEdit extends React.Component {


  constructor() {
    super()
    this.state = {
      formData: {
        comments: {
          ratings: {
            overall: 1,
            fullness: 1,
            healthiness: 1
          }
        },
        imgUploadData: {}

      },
      imagUploadData: {},
      errors: {}
    }

    this.handleUpload = this.handleUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.handleDietaryChange = this.handleDietaryChange.bind(this)
    this.handleCuisineChange = this.handleCuisineChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
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
    // console.log('image upload suceess...', imageData)
    console.log(this.state.errors.comments)
    const formData = { ...this.state.formData, image: (imageData.filesUploaded || []).map(option => option.url) }
    this.setState({ formData })
  }
  handleChange(e) {

    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
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

  componentDidMount() {
    axios.get(`/api/dishes/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }


  render() {
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
              {this.state.errors.comments.content && <small className="help is-danger">{this.state.errors.comments.content.message}</small>}
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


            <button className="button">Save your changes</button>
          </form>

        </div>
      </section>

    )
  }

}

export default DishEdit
