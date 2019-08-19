import React from 'react'
import Slider from 'react-slick'

class ImgSlider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1

    }
    console.log(this.props.images)
    return (
      <div>
        <h2>IMAGE SLIDER</h2>
        <Slider {...settings}>
          <div>
            <h3>
              <img src={this.props.images} />
            </h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    )
  }
}

export default ImgSlider
