import React, {useEffect, useState}from 'react'

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Row } from 'react-bootstrap';
import { Marker } from "react-mapbox-gl";



// const Map = ReactMapboxGl({
//     accessToken:
//       'pk.eyJ1IjoiZ2lsYmVydGtpdGV0dSIsImEiOiJjbDh4MHl1bXowMjM4M3ZsaGF4eXdweGl1In0.xDnnf0CoiXLL-Xiv6Pvr8w'
//   });
const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZ2lsYmVydGtpdGV0dSIsImEiOiJja21sc2NsMHcxZTZpMnZrNTI2Y2NkZnA1In0.gcgHnl9jw1j6Mi8mZFdvjg'
  });


function MapScreen() {

    
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              console.log(position);
              console.log(`latitude: ${position.coords.latitude}`)
              setlatitude(position.coords.latitude)
              console.log(`longotude: ${position.coords.longitude}`)
              setlongitude(position.coords.longitude)
            });
        } else {
                return
            }
    }, [])
    

  return (
    <Row>
    <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
        height: '90vh',
        width: '100vw'
    }}
 
    >
        <Marker
            coordinates={[longitude, latitude]}
            anchor="bottom">
            <img src='https://freepngimg.com/thumb/google/66943-map-google-places-maps-pen-marker-maker.png'/>
        </Marker>
      
            
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={[longitude, latitude]} />
        </Layer>

    </Map>
    </Row>
  )
}

export default MapScreen