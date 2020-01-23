import React from 'react';
import PlaylistCard from '../components/PlaylistCard.js';
import '../App.css'
import { CardDeck } from 'react-bootstrap';

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
            <div className="my-playlists" style={{paddingTop: '50px', paddingLeft: '50px'}}>
                <h3 className="title" style={{
                    color: '#212120',
                    fontSize: '50px',
                    fontFamily: 'Pavanam'}}>{this.props.user}'s Playlists</h3>
                <CardDeck style={{display: 'flex', flexDirection: 'row', paddingLeft: '50px'}}>
                {this.state.myPlaylists.map(playlist => <PlaylistCard playlist={playlist} className="deck"/>)}
                </CardDeck>
            </div>
        )
        } else {
            return(
                <div style={{
                    color: '#212120',
                    fontSize: '30px',
                    fontFamily: 'Pavanam',
                    position: 'absolute',
                    left: '20%',
                    top: '30%',
                    transform: 'translate(-50%, -50%)'
                    }}><a>
                    You have no playlists saved :(
                    </a><br></br>
                    <a>
                    Search a city to get started!
                    </a>
                </div>
            )
        }
    }
}

export default PlaylistsContainer;