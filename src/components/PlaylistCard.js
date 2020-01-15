import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PlaylistSongCard from './PlaylistSongCard.js'

class PlaylistCard extends React.Component{ 

    state = {
        songs: [],
        button: 'Show Songs',
        playlistIds: 0
    }

    removeSong = (songobject) => {
        let ID = songobject.playlist_id
        fetch(`http://127.0.0.1:3000/api/v1/songs/${songobject.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                accepts: 'application/json'
            }
        })
        .then(this.setState({
            songs: this.state.songs.filter(song => song.id !== songobject.id),
            playlistIds: this.state.songs.length - 1
        }))
        .then(this.state.playlistIds === 1 ? this.deletePlaylist(ID) : '' )
    }


    deletePlaylist = (ID) => {
        fetch(`http://127.0.0.1:3000/api/v1/playlists/${ID}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                accepts: 'application/json'
            }
        })
    }

    toggleSongs = (playlist) => {
        if(this.state.button === 'Show Songs'){
            fetch("http://127.0.0.1:3000/api/v1/songs")
            .then(resp => resp.json())
            .then(songs => {
                songs.forEach(song => {
                    if(song.playlist_id === playlist.id){
                        this.setState({
                            songs: [...this.state.songs, song],
                            button: 'Hide Songs',
                            playlistIds: this.state.songs.length + 1
                        })
                    }
                })
            })
        } else {
            this.setState({
                songs: [],
                button: 'Show Songs'
            })
        }
    }
    
    render(){
    const playlist = this.props.playlist
    return(
        <div>
            <ListGroup>
                <ListGroup.Item key={this.props.playlist.id}>
                    <h3>{playlist.location} Playlist (saved {playlist.created_at.slice(0, 10)})</h3>
                    <button onClick={() => this.toggleSongs(playlist)}>{this.state.button}</button>
                    {this.state.songs.length > 0 ? this.state.songs.map(song => <PlaylistSongCard removeSong={this.removeSong} song={song}/>) : '' }
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
    }
}

export default PlaylistCard;