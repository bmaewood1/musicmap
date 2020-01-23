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
  apiKey: ("AIzaSyA7dXR0n8FjC95-T1_qZJdXaWhH6JPFaZQ")
})(MapComponent)
