import React from 'react';
import { ListGroup } from 'react-bootstrap';
import MapComponent from './Map.js';
import '../App.css';

const songSource = `https://open.spotify.com/embed/track/`

class PlaylistSongCard extends React.Component {


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
    return(
        <div>
            <ListGroup className="home-playlist-card">
            <ListGroup.Item key={this.props.song.id} style={{backgroundColor: '#DEE6F0'}}>
                    <button type="button" className="close" aria-label="Close" onClick={() => this.props.removeSong(this.props.song)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <b>Title:</b> {this.props.song.title}
                    <br></br>
                    <b>Artist:</b> {this.props.song.artist}
                    <br></br>
                    <iframe src= {songSource + this.props.song.track_id} width="300" height="80" allowtransparency="true" allow="encrypted-media"></iframe>
                    <br></br>
                    <i>Upcoming Gig</i>
                    <br></br>
                    <b>Date:</b> {this.props.song.date}
                    <br></br>
                    <b>Venue:</b> {this.props.song.venue}
                    <br></br>
                    <b>Category:</b> {this.props.song.category}
                    <br></br>
                    <button onClick={this.handleButton}>{this.state.googleButton}</button>
                    <br></br>
                    {this.state.displayGoogle ? <MapComponent lat={this.props.song.lat} lng={this.props.song.lng}/> : ''}
                    <br></br>
                    <a href='' onClick={() => this.props.newTab(this.props.song.songkick_url)}>Ticket Link</a>
                    <br></br>
                    <a href='' onClick={() => this.props.newTab(`https://open.spotify.com/artist/${this.props.song.spotify_artistId}`)}>More from {this.props.song.artist}</a>

                </ListGroup.Item>
            </ListGroup>
        </div>
    )
    }
}

export default PlaylistSongCard;