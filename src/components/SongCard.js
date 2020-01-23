import React from 'react';
import { ListGroup } from 'react-bootstrap';
import MapComponent from './Map.js';

const songSource = `https://open.spotify.com/embed/track/`

class SongCard extends React.Component{

    state = {
        displayGoogle: false,
        googleButton: 'Show on Map'
    }

    handleButton = () => {
        this.setState({
            displayGoogle: !this.state.displayGoogle
        })
        if(this.state.googleButton === 'Show on Map'){
            this.setState({
                googleButton: 'Hide Map'
            })
        } else if(this.state.googleButton === 'Hide Map'){
            this.setState({
                googleButton: 'Show on Map'
            })
        }
    }

    render(){
    if(this.props.event.track){
    return(
        <div>
            <ListGroup className="home-playlist-card" style={{ width: '43rem'}}>
                <ListGroup.Item key={this.props.event.id} style={{backgroundColor: '#DEE6F0'}}>
                    <b style={{fontSize: '18px'}}>Title:</b><a style={{fontSize: '18px'}}> {this.props.event.track.name}</a>
                    <br></br>
                    <b>Artist:</b> {this.props.event.performance[0].displayName}
                    <br></br>
                    <i style={{fontSize: '18px'}}>Upcoming Gig</i>
                    <br></br>
                    <b>Date:</b> {this.props.event.start.date}
                    <br></br>
                    <b>Venue:</b> {this.props.event.venue.displayName}
                    <br></br>
                    <b>Category:</b> {this.props.event.type}
                    <br></br>
                    <button onClick={this.handleButton}>{this.state.googleButton}</button>
                    <br></br>
                    {this.state.displayGoogle ? <MapComponent lat={this.props.event.venue.lat} lng={this.props.event.venue.lng}/> : ''}
                    <br></br>
                    <a href='' onClick={() => this.props.newTab(this.props.event.uri)}>Ticket Link</a>
                    <br></br>
                    <iframe src= {songSource + this.props.event.track.id} width="300" height="80" allowtransparency="true" allow="encrypted-media"></iframe>
                    <br></br>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
        }else{
            return(
                <div>
                </div>
            )
        }
    }
}

export default SongCard;