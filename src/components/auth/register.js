import React from 'react'
import axios from 'axios'
import ImgUploader from '../common/imgUploader'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleUpload = this.handleUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUpload(imageData) {
    const uploadedImage = (imageData.filesUploaded[0].url)
    const formData = {...this.state.formData, img: uploadedImage}
    this.setState({ formData })
    this.setState({ imageMessage: 'image upload sucsessful...' })
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register', this.state.formData)
      .then(() => {
        this.props.history.push('/login')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <div className="column is-center-object is-6-desktop is-9-tablet is-11-mobile">
            <div className="box">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      name="username"
                      placeholder="eg: leela3000"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="eg: leela3000@planetexpress.co.nny"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      placeholder="eg: ••••••••"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                </div>
                <div className="field">
                  <label className="label">Password Confirmation</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="passwordConfirmation"
                      placeholder="eg: ••••••••"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
                </div>
                <div className="column is-center-text"><ImgUploader className="button is-success" parentCallback={this.handleUpload} />
                  {this.state.imageMessage && <div className="help is-info is-medium">{this.state.imageMessage}</div>}</div>
                <div className="column is-center-text">
                  <button className="button is-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Register
