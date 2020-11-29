import React from 'react';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { useRouter } from 'next/router';

const GET_DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=';

const SimpleMapExampleGoogleMap = withScriptjs(
  withGoogleMap( ({ lat, lng }) => {
    const {pathname} = useRouter();
    return (
      <GoogleMap defaultZoom={12} defaultCenter={new google.maps.LatLng(lat, lng)}>
        <Marker position={new google.maps.LatLng(lat, lng)}>
          {pathname.indexOf('/ca-ES') == -1 && (
            <InfoWindow>
              <div>
                <a href={GET_DIRECTIONS + lat + ',' + lng}>Cómo llegar</a>
              </div>
            </InfoWindow>
          )}
          {pathname.includes('/ca-ES') && (
            <InfoWindow>
              <div>
                <a href={GET_DIRECTIONS + lat + ',' + lng}>Com arribar-hi</a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    );
  })
);

export default function MapaDeGoogle({ lat, lng, ruta }) {

  return (
    <SimpleMapExampleGoogleMap
      lat={lat}
      lng={lng}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `300px`, marginBottom: `2em` }} />}
      mapElement={<div style={{ height: `300px`, marginBottom: `2em` }} />}
    />
  );
}
