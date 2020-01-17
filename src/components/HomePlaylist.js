import React from 'react';
import SongCard from './SongCard.js';

class HomePlaylist extends React.Component{

    render(){
        return(
            <div>
                {this.props.cityName} Playlist
                {this.props.allEvents.map(event => <SongCard event={event} cityName={this.props.cityName}/>)}
                <br></br>
                <button onClick={()=> this.props.savePlaylist(this.props.allEvents, this.props.cityName)}>Save Playlist to MusicMap</button>
                <button onClick={()=> this.props.savePlaylistToSpotify(this.props.allEvents, this.props.cityName)}>Save Playlist to Spotify</button>
            </div>
            )

        }
    }

export default HomePlaylist;