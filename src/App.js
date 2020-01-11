import React from 'react';
import './App.css';
import queryString from 'query-string';
import NavbarClass from './components/Navbar.js'
import MainContainer from './containers/MainContainer.js';
import PlaylistsContainer from './containers/PlaylistsContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, Form, FormControl, Button
} from 'react-bootstrap';
// import MusicMap from './MusicMap.png';

import MusicMap from './MusicMap.png';


class App extends React.Component {

  state = {
    user: null,
    userId: null,
    filterString: '', 
    users: [],
    songs: [],
    accessToken: null
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(resp => resp.json())
    .then(data => {
      this.setState({
            user: data.display_name
        })
      fetch('http://127.0.0.1:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({
        name: data.display_name
      })
    })})
    .then(this.setUserId)
    
  }

  spotifySearch = (name) => {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    fetch(`https://api.spotify.com/v1/search?q=${name.name}&type=track%2Cartist&market=US&limit=1`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(resp => resp.json())
        .then(data => this.setState({
          songs: [...this.state.songs, {
            url: data.tracks.items[0].external_urls.spotify,
            artist: name.name,
            id: name.id,
            title: data.tracks.items[0].name
          }]
        }))
    }

    setUserId = () => {
      fetch("http://127.0.0.1:3000/api/v1/users")
      .then(resp => resp.json())
      // .then(data => console.log(data))
      .then(data => data.find(user => 
        {if(user.name === this.state.user){
          this.setState({
            userId: user.id
          })
        }}
      ))
    }

    savePlaylist = (playlist, city) => {
      console.log(this.state.userId)
      fetch('http://127.0.0.1:3000/api/v1/playlists', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          accepts: 'application/json'
        },
        body: JSON.stringify({
          location: city,
          user_id: this.state.userId
        })
      })
      .then(resp => resp.json())
      .then(data => this.saveSongs(data, playlist))
    }

    saveSongs = (data, playlist) => {
      playlist.forEach(song => {
        console.log(song.start.date)
        fetch('http://127.0.0.1:3000/api/v1/songs', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            accepts: 'application/json'
          },
          body: JSON.stringify({
            //song
            playlist_id: data.id,
            title: song.track,
            artist: song.performance[0].displayName,
            spotify_url: song.url,
            // //event
            // date: song.start.date,
            // venue: song.venue.display_name,
            // type: song.type,
            // songkick_url: song.uri
          })
        })
        .then(this.saveEvents(song, playlist))
        //:song_id, :date, :venue, :type, :songkick_url
        // .then(resp => resp.json())
      //   .then(songs => {
      //     fetch('http://127.0.0.1:3000/api/v1/events', {
      //       method: 'POST',
      //       headers: {
      //         'Content-type': 'application/json',
      //         accepts: 'application/json'
      //     },
      //     body: JSON.stringify({
      //       song_id: songs.id,
      //       date: song.start.date,
      //       venue: song.venue.displayName,
      //       type: song.type,
      //       songkick_url: song.uri
      //     })
      //   })
      //   }
      // )
    })
  }

    saveEvents = (song, playlist) => {
      playlist.forEach(song => {
        fetch('http://127.0.0.1:3000/api/v1/events', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            accepts: 'application/json'
          },
          body: JSON.stringify({
            song_id: song.id,
            date: song.start.date,
            venue: song.venue.displayName,
            category: song.type,
            songkick_url: song.uri
          })
        })
      })
    }

  render() {
    return (
      <div className="App">
        <Router>
            
            <Navbar bg="light" variant="light">
                <Navbar.Brand className="navbar-brand">
                    <img src={MusicMap} className="nav-logo"/>
                </Navbar.Brand>
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/playlists" className="navbar-link">My Playlists</Link>
                {/* <Route
                        path="/"
                        component={MainContainer}
                        exact 
                    /> */}
                    <Route
                        path="/playlists"
                        component={PlaylistsContainer} 
                    />
            </Navbar>
          </Router>
      <div>
        <h1>
          {this.state.user}'s Dashboard
        </h1>
        <button onClick={() => {
          window.location = 'http://localhost:8888/login' }
        }
        >Sign out</button>
        <MainContainer spotifySearch={this.spotifySearch} songs={this.state.songs} savePlaylist={this.savePlaylist}/>
        <PlaylistsContainer />
      </div> 
    </div>
    );
  }
}

export default App;
