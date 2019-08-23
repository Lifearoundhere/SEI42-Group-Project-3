import React from 'react'
import ReactMapboxGL, { Feature, Layer, RotationControl, ZoomControl, ScaleControl } from 'react-mapbox-gl'
const Map = ReactMapboxGL({ accessToken: process.env.MAPBOX_TOKEN })



const POSITION_CIRCLE_PAINT = {
  'circle-stroke-width': 4,
  'circle-radius': 10,
  'circle-blur': 0.15,
  'circle-color': '#3770C6',
  'circle-stroke-color': 'black'
}

export class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: { lat: 51.5074, lng: 0.1278 }
    }
    this.onDragEnd = this.onDragEnd.bind(this)
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
  }

  onDragEnd(e) {
    this.props.onDragged({ latitude: e.lngLat.lat, longitude: e.lngLat.lng })
    this.setState({
      userLocation: { lat: e.lngLat.lat, lng: e.lngLat.lng }
    })
  }

  render() {
    const { lng, lat } = this.state.userLocation
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        zoom={[16]}
        containerStyle={{
          height: '40vh'

        }}
        center={[lng, lat]}
      >
        <Layer type="circle" id="position-marker" paint={POSITION_CIRCLE_PAINT} >
          <Feature coordinates={[lng || 0.0722, lat || 51.5153]}
            draggable={true}
            onDragEnd={this.onDragEnd}
          />
        </Layer>
        <RotationControl />
        <ZoomControl />
        <ScaleControl />
      </ Map >
    )
  }
}
export default MapContainer
