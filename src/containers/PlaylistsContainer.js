import React from 'react';
import PlaylistCard from '../components/PlaylistCard.js';


class PlaylistsContainer extends React.Component{

    state = {
        myPlaylists: null,
        mySongs: [],
        playlistIds: []
    }



    componentDidMount(){
        let array = []
        fetch("http://127.0.0.1:3000/api/v1/playlists")
        .then(resp => resp.json())
        .then(playlists => {
            array = playlists.filter(pl => (pl.user_id === this.props.userId))
            }
        )
        .then(() => {
            this.setState({
            myPlaylists: array
            })
        })
    }


    render(){
        if(this.state.myPlaylists && this.state.myPlaylists.length > 0){
        return(
            <div>
                My Playlists
                {this.state.myPlaylists.map(playlist => <PlaylistCard playlist={playlist}/>)}
            </div>
        )
        } else {
            return(
                <div>
                    You have no playlists saved - search a city to get started!
                </div>
            )
        }
    }
}

export default PlaylistsContainer;