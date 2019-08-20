import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React, { Component } from 'react'

const mapStyles = {
  width: '40%',
  height: '40%'
}

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      >
        <Marker position={{ lat: 48.00, lng: -122.00 }} />
      </Map>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS
})(MapContainer)
