import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class MapComponent extends React.Component {
  render() {
    return (
      <Map style={{width: '35rem'}} google={this.props.google} initialCenter={{lat: this.props.lat, lng: this.props.lng}} zoom={14}>

        <Marker
            center={{lat: this.props.lat, lng: this.props.lng}} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>

        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("insert api key here")
})(MapComponent)
