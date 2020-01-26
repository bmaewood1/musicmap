import React from 'react';
import { Card } from 'react-bootstrap';
import PlaylistSongCard from './PlaylistSongCard.js'
import queryString from 'query-string';

class PlaylistCard extends React.Component{ 

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {scrollTop: 0,         
            songs: [],
            button: 'Show Songs',
            playlistIds: 0,
            width: '22rem',
            bc: '#DEE6F0'
        }
      }

    onScroll = () => {
        const scrollTop = this.myRef.current.scrollTop
        this.setState({
            scrollTop: scrollTop
        })
    }

    removeSong = (songobject) => {
        //delete on 
        let playlist = ''
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        fetch("http://127.0.0.1:3000/api/v1/playlists")
        .then(resp => resp.json())
        .then(data => {
            playlist = data.find(p => p.id === songobject.playlist_id)
        })
        .then(() => fetch(`https://api.spotify.com/v1/playlists/${playlist.spotify_playlistId}/tracks`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + accessToken},
            body: JSON.stringify({"tracks": [
                {
                    "uri": songobject.spotify_url
                }
            ]})
        }))
        //delete song on backend
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
                            playlistIds: this.state.songs.length + 1,
                            width: '26rem',
                            bc: '#98ACC3'
                        })
                    }
                })
            })
        } else {
            this.setState({
                songs: [],
                button: 'Show Songs',
                width: '22rem',
                bc: '#DEE6F0'
            })
        }
    }

    newTab = (url) => { 
        window.open(url, "_blank"); 
    }
    
    render(){
    const playlist = this.props.playlist
    return(
        <div ref={this.myRef} onScroll={this.onScroll} style={{overflow: 'scroll', width: '400px', height: '400px'}}>
            <Card border="warning" style={{ width: this.state.width, backgroundColor: '#DEE6F0' }}  >
                <Card.Header><b>{playlist.location} Playlist </b>(saved {playlist.created_at.slice(0, 10)})</Card.Header>
                <Card.Body style={{backgroundColor: this.state.bc}}>
                    {this.state.songs.length > 0 ? this.state.songs.map(song => <PlaylistSongCard newTab={this.newTab} removeSong={this.removeSong} song={song}/>) : '' }
                    <button onClick={() => this.toggleSongs(playlist)}>{this.state.button}</button>
                    <button onClick={() => this.newTab(`https://open.spotify.com/playlist/${playlist.spotify_playlistId}`)}>View Playlist in Spotify</button>
                </Card.Body>
            </Card>
        </div>
    )
    }
}

export default PlaylistCard;