import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ReactMapboxGL, { Popup, Feature, Layer, ScaleControl, ZoomControl, RotationControl } from 'react-mapbox-gl'
import icon from '../../assets/icons8cutlery64.png'
import Model from '../common/Model'
import Auth from '../../lib/Auth'



const Map = ReactMapboxGL({ accessToken: process.env.MAPBOX_TOKEN })

const image = new Image()
image.src = icon
const images = ['FoodTruck', image]

const StyledPopup = styled.div`
  background: #e9f4fa;
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
      zoom: [15],
      modalState: true
    }
    this.toggleModal = this.toggleModal.bind(this)
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
  toggleModal() {
    console.log('clicked')
    this.setState({ modalState: false })
  }

  render() {
    if (this.state.loading) return <p>loading...</p>
    return (
      <div>
        {!Auth.isAuthenticated() && this.state.modalState &&
          <Model
            closeModal={this.toggleModal}
            modalState={this.state.modalState}
            title={'Welcome to Food Fidelity'}
          >
            <p>We are here to help you find the best street food in your local area.</p>
            <p>We welcome all foodies, please leave a review and share your thoughts.</p>
          </Model>}

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
                onClick={() => this.setState({ selectedDish: dish, zoom: [20], userLocation: { lat: dish.latitude, lng: dish.longitude } })}
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

                  <img src={dish.image} width="100px" height="20px" className="center" />
                </div>
              </StyledPopup>
            </Popup>) : null
          ))}
          <RotationControl />
          <ZoomControl />
          <ScaleControl />
        </Map>

      </div>

    )
  }
}

export default Home
