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
        comment: {}
      },
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
    const imgUploadData = { ...this.state.imgUploadData, image: (imageData.filesUploaded || []).map(option => option.url) }
    this.setState({ imgUploadData })
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
    const formData = { ...this.state.formData, healthiness: e }
    this.setState({ formData })
  }


  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()
    axios.put((`/api/dishes/${this.props.match.params.id}/comments`), this.state.formData, {
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
              <label className="label">Comment</label>
              <textarea
                name="content"
                className="textarea"
                placeholder="Add a comment..."
                onChange={this.handleChange}
                value={this.state.formData.content}
              />
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
                <label className="file-label">
                  <button className="button is-info is-medium">
                    <ImgUploader parentCallback={this.handleUpload} />
                  </button>
                </label>
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
