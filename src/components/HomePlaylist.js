import React from 'react';
import SongCard from './SongCard.js';

class HomePlaylist extends React.Component{
    render(){
        if(this.props.allEvents.length > 0 && this.props.allEvents[0].track){
        return(
            <div>
                {this.props.cityName} Playlist
                {this.props.allEvents.map(event => <SongCard event={event} cityName={this.props.cityName}/>)}
                <br></br>
                <button onClick={()=> this.props.savePlaylist(this.props.allEvents, this.props.cityName)}>Save Playlist</button>
            </div>
        )
        } else{
            return(
                <div>

                </div>
            )
        }
    }
}

export default HomePlaylist;