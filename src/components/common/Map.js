import React from 'react'
import ReactMapboxGL, { Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGL({ accessToken: process.env.MAPBOX_TOKEN })

function MapComp(props) {
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      zoom={[16]}
      containerStyle={{
        height: '40vh'

      }}
      center={[props.longitude, props.latitude]}
    >
      <Marker
        coordinates={[props.longitude, props.latitude]}
      >
        <img src={'https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_2-512.png'}
          height='50'
          width='50'
        />
      </Marker>
    </Map>
  )
}
export default MapComp