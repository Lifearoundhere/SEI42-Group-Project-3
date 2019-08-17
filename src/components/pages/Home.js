import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ReactMapboxGL, { Popup, Feature, Layer, ScaleControl } from 'react-mapbox-gl'
import icon from '../../assets/icons8cutlery64.png'


const Map = ReactMapboxGL({ accessToken: process.env.MAPBOX_TOKEN })

const image = new Image()
image.src = icon
const images = ['FoodTruck', image]

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`
class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      userLocation: { lat: 51.5074, lng: 0.1278 },
      dishes: [],
      showPopup: false
    }
  }

  testGeolocation() {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!')
    } else {
      console.log('Geolocation is not supported for this Browser/OS.')
    }
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false,
          dish: undefined
        })
      },
      () => {
        this.setState({ loading: false })
      }
    )
    axios.get('/api/dishes')
      .then(res => this.setState({ dishes: res.data }))
      .catch(err => console.dir(err))
  }

  render() {
    { if (this.state.loading) return <p>loading...</p> }
    const layoutLayer = { 'icon-image': 'FoodTruck' }
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v8"
        center={[
          this.state.userLocation.lng, this.state.userLocation.lat

        ]}
        zoom={[12]}
        containerStyle={{
          height: '90vh',
          width: '100vw'
        }}
      >
        <Layer type="symbol" id="marker" layout={layoutLayer} images={images}
          onClick={console.log('clicked2')}
          onMouseEnter={console.log('clicked mouse')}
        >
          {this.state.dishes.map((dish, index) => (
            <Feature
              key={dish._id}
              onClick={console.log('clicked')}
              coordinates={[dish.longitude, dish.latitude]}
            />
          ))}
        </Layer>
        {this.state.dish && this.state.dishes.map((dish, index) => (
          <Popup
            key={dish._id}
            coordinates={[dish.longitude, dish.latitude]}
            closeButton={true}
            closeOnClick={true}
            onClose={() => this.setState({ showPopup: false })}
          >
            <StyledPopup>
              <div>
                <div>{dish.name} | £{dish.price}</div>

                <img src={dish.image} width="20px" height="20px" />
              </div>
            </StyledPopup>
          </Popup>
        ))}
        <ScaleControl />
      </Map>

    )
  }
}

export default Home