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
      selectedDish: null,
      zoom: [12]
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
    console.log(process.env)
    if (this.state.loading) return <p>loading...</p>
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v8"
        center={[
          this.state.userLocation.lng, this.state.userLocation.lat

        ]}
        zoom={this.state.zoom}
        containerStyle={{
          height: '90vh',
          width: '100vw'
        }}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'FoodTruck' }} images={images}>
          {this.state.dishes.map(dish => (
            <Feature
              key={dish._id}
              onClick={() => this.setState({ selectedDish: dish, zoom: [18], userLocation: { lat: dish.latitude, lng: dish.longitude } })}
              coordinates={[dish.longitude, dish.latitude]}
            />
          ))}
        </Layer>
        {this.state.dishes.map(dish => (
          this.state.selectedDish === dish ? (<Popup
            key={dish._id}
            coordinates={[dish.longitude, dish.latitude]}
            closeButton={true}
            closeOnClick={true}
            onClose={() => this.setState({ selectedPopup: null })}
          >
            <StyledPopup>
              <div>
                <div>{dish.name} | £{dish.price}</div>

                <img src={dish.image} width="20px" height="20px" />
              </div>
            </StyledPopup>
          </Popup>) : null
        ))}
        <ScaleControl />
      </Map>

    )
  }
}

export default Home
