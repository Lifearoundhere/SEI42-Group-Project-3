import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'
import ReactFilestack from 'filestack-react'

const choices = {
  accept: 'image/*',
  transformations: {
    rotate: true,
    crop: true,
    circle: false
  }
}

class UserEdit extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      data: {},
      errors: {},
      file: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUploadedImages = this.handleUploadedImages.bind(this)
  }




  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/users/${this.props.match.params.id}`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/users/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  componentDidMount() {
    axios.get(`api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))

    console.log(this.state.data)
  }

  handleUploadedImages(result) {
    console.log(this.state.data)
    const data = { ...this.state.data, img: result.filesUploaded[0].url }
    this.setState({ data })
  }

  render() {
    console.log(this.state.data, 'this.state.data')
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>



            <label className="label">Editing my account</label>

            <div className="field">

              <label className="label">Profile Photo</label>
              <figure className="image is-128x128">
                <ReactFilestack
                  className="image is-128x128"
                  apikey="A8sWHIqsSAqLSlJAAfZLgz"
                  buttonText="Upload your Photo"
                  buttonClass="button"
                  options={choices}
                  preload={true}
                  onSuccess={this.handleUploadedImages}
                />

                {this.state.data.img && <img src={this.state.data.img} />}
              </figure>
            </div>


            <div className="field">
              <label className="label">Username</label>
              <input
                className="input"
                type="text"
                name="username"
                value={this.state.data.username || ''}
                placeholder="eg. superman..."
                onChange={this.handleChange}
              />
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>

            <div className="field">
              <label className="label">Biography</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="bio"
                  value={this.state.data.bio || ''}
                  placeholder="eg. I enjoy when I spent time with my friends..."
                  onChange={this.handleChange}
                />
              </div>

              <div className="field">
                <label className="label">Favfood</label>
                <input
                  className="input"
                  type="text"
                  name="favfood"
                  value={this.state.data.favfood || ''}
                  placeholder="eg. superman..."
                  onChange={this.handleChange}
                />
                {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
              </div>
            </div>
            <br/>

            <div className="level-item">
              <button className="button is-info submit-edit-button">Submit Changes</button>
            </div>





          </form>

        </div>



      </section>
    )
  }
}
//


export default UserEdit
