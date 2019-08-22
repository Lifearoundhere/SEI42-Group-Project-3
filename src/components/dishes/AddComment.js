import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import StarRatings from 'react-star-ratings'
import ImgUploader from '../common/imgUploader'


class AddComment extends React.Component {


  constructor() {
    super()
    this.state = {
      formData: {
        content: '',
        overall: 1,
        fullness: 1,
        healthiness: 1,
        image: ''

      },
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
    const uploadedImage = (imageData.filesUploaded[0].url)
    const formData = {...this.state.formData, image: uploadedImage}
    this.setState({ formData })
    this.setState({ imageMessage: 'image upload suceess...' })
  }
  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleOverallChange(e) {
    const formData = { ...this.state.formData, overall: e }
    this.setState({ formData })
  }
  handleFullnessChange(e) {
    const formData = { ...this.state.formData, fullness: e }
    this.setState({ formData })
  }
  handleHealthinessChange(e) {
    const formData = { ...this.state.formData, healthiness: e}
    this.setState({ formData })
  }


  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()
    axios.put((`/api/dishes/${this.props.match.params.id}/comments`), this.state.formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => this.props.history.push(`/dishes/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    const [ key ] = Object.keys(this.state.errors)
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>

            <div className="field">
              <label className="label">Comment</label>
              <textarea
                name="content"
                className="textarea"
                placeholder="Add a comment..."
                onChange={this.handleChange}
                value={this.state.formData.content}
              />
              {this.state.errors[key] && <small className="help is-danger">{this.state.errors[key]}</small>}
            </div>

            <div className="field">
              <label className="label">Overall rating</label>

              <StarRatings
                rating={this.state.formData.overall}
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
                rating={this.state.formData.fullness}
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
                rating={this.state.formData.healthiness}
                starRatedColor="yellow"
                changeRating={this.handleHealthinessChange}
                numberOfStars={5}
                name='rating'
              />
              {this.state.errors.healthiness && <small className="help is-danger">{this.state.errors.healthiness}</small>}
            </div>

            <div className="field">
              <div className="file is-info is-medium">

                <ImgUploader parentCallback={this.handleUpload} />
                {this.state.imageMessage && <div className="help is-info is-medium">{this.state.imageMessage}</div>}
              </div>
            </div>
            <button className="button">Add your comment</button>
          </form>
        </div>
      </section>

    )
  }

}

export default AddComment
