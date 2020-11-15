import React, { useState } from 'react';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const GET_DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=';

const SimpleMapExampleGoogleMap = withScriptjs(
  withGoogleMap(props => {
    console.log('here new props are used', props);
    return (
      <GoogleMap defaultZoom={12} defaultCenter={new google.maps.LatLng(props.lat, props.lng)}>
        <Marker position={new google.maps.LatLng(props.lat, props.lng)}>
          {props.ruta.indexOf('/ca-ES') == -1 && (
            <InfoWindow>
              <div>
                <a href={GET_DIRECTIONS + props.lat + ',' + props.lng}>Cómo llegar</a>
              </div>
            </InfoWindow>
          )}
          {props.ruta.includes('/ca-ES') && (
            <InfoWindow>
              <div>
                <a href={GET_DIRECTIONS + props.lat + ',' + props.lng}>Com arribar-hi</a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    );
  })
);

export default function MapaDeGoogle(props) {
  const [lat, setLat] = useState(props.lat);
  const [lng, setLng] = useState(props.lng);
  const [ruta, setRurat] = useState(props.ruta);

  return (
    <SimpleMapExampleGoogleMap
      lat={lat}
      lng={lng}
      ruta={ruta}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `300px`, marginBottom: `2em` }} />}
      mapElement={<div style={{ height: `300px`, marginBottom: `2em` }} />}
    />
  );
}
