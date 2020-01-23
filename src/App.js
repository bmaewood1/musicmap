import React from 'react';
import './App.css';
import queryString from 'query-string';
import MainContainer from './containers/MainContainer.js';
import PlaylistsContainer from './containers/PlaylistsContainer';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import MusicMap from './MusicMap.png';

class App extends React.Component {

  state = {
    accessToken: null,
    refreshToken: null,
    tokenTime: null,
    user: null,
    userId: null,
    filterString: ''
  }


  getHashParams() {
    let path = window.location.pathname;
    let removeSlash = path.split("/");
    let separatedKeys = queryString.parse(removeSlash[1]);
    return separatedKeys;
  }

  componentDidMount() {
    this.setState({
      accessToken: this.getHashParams().access_token,
      refreshToken: this.getHashParams().refresh_token,
      tokenTime: Date.now()
    })
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(resp => resp.json())
    .then(data => {
      this.setState({
            user: data.display_name,
            username: data.id
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

  spotifySearch = (artist_name) => {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    fetch(`https://api.spotify.com/v1/search?q=${artist_name.name}&type=track%2Cartist&market=US&limit=1`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(resp => resp.json())
        .then(data => this.setState({
          songs: [...this.state.songs, {
            artist: artist_name,
            track: data.tracks.items[0]
          }]
        }))
    }

    setUserId = () => {
      fetch("http://127.0.0.1:3000/api/v1/users")
      .then(resp => resp.json())
      .then(data => data.find(user => 
        {if(user.name === this.state.user){
          this.setState({
            userId: user.id
          })
        }}
      ))
    }

    savePlaylist = (playlist, city, playlistId) => {
      fetch('http://127.0.0.1:3000/api/v1/playlists', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          accepts: 'application/json'
        },
        body: JSON.stringify({
          location: city,
          user_id: this.state.userId,
          spotify_playlistId: playlistId
        })
      })
      .then(resp => resp.json())
      .then(data => this.saveSongs(data, playlist))
    }

    saveSongs = (data, playlist) => {
      playlist.forEach(song => {
        if(song.track){
        fetch('http://127.0.0.1:3000/api/v1/songs', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            accepts: 'application/json'
          },
          body: JSON.stringify({
            //song
            playlist_id: data.id,
            title: song.track.name,
            artist: song.track.artists[0].name,
            spotify_url: song.track.uri,
            track_id: song.track.id,
            spotify_artistId: song.track.artists[0].id,
            // //event
            date: song.start.date, 
            venue: song.venue.displayName,
            category: song.type,
            songkick_url: song.uri,
            lat: song.venue.lat,
            lng: song.venue.lng
          })
        })
      }
    })
  }

  savePlaylistToSpotify = (events, name) => {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let playlistId = ''
    fetch(`https://api.spotify.com/v1/users/${this.state.username}/playlists`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + accessToken },
      body: JSON.stringify({
        "name": `${name} Playlist`,
        "description": "New playlist description",
        "public": true
      })
    })
    .then(resp => resp.json())
    .then(data => {
      playlistId = data.id
    })
    .then(() => this.savePlaylist(events, name, playlistId))
    .then(() => this.saveSongsToSpotify(events, playlistId))
  }

  saveSongsToSpotify = (events, playlistId) => {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
      events.forEach(event => {
        if(event.track){
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify%3Atrack%3A${event.track.id}`, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + accessToken }}
      )
      .then(alert("♪ Playlist saved ♪"))
      .then(window.location.reload(false))
    }})
  }

  handleRefresh = async () => {
    let newToken = await fetch(`http://localhost:8888/refreshToken/${this.state.refreshToken}`)
    let parsedToken = await newToken.json();
    if (parsedToken.refresh_token) {
      this.setState({
        accessToken: parsedToken.access_token,
        refreshToken: parsedToken.refresh_token
      })
    }
    else {
      this.setState({
        ...this.state,
        accessToken: parsedToken.access_token
      })
    }
  }
  timeToken = () => {
    console.log(Date.now() - this.state.tokenTime);
    return (Date.now() - this.state.tokenTime)
  }

  setStateAsync = (newState) => {
    return new Promise(resolve => {
      this.setState(newState,resolve);
    })
  }
  
    logout = () => {
      this.setState({
        accessToken: "",
        refreshToken: "",
        tokenTime: "",
        userId: null
      })
      window.location.pathname= "/";
    }

  render()
  {
    if (!this.state.userId) {
      return (
        <div className = "loginPageDiv" style={{  
          backgroundImage: "url(" + "https://www.pexels.com/photo/people-in-concert-154147/" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
          <a style={{
            color: '#666666', 
            fontFamily: 'Pavanam', 
            fontSize: '50px',
            position: 'absolute', 
            left: '42%', 
            top: '29%',
            transform: 'translate(-50%, -50%)',
            fontWeight: '500'
            }}>Welcome to </a>
          <br></br>
          <img src={MusicMap} width="360" height="100" style={{
            position: 'absolute', 
            left: '50%', 
            top: '35%',
            transform: 'translate(-50%, -50%)'}}/>
          <br></br>
            <button onClick={() => window.location='http://localhost:8888/login'} style={{
              position: 'absolute', 
              left: '47%', 
              top: '44%',
              transform: 'translate(-50%, -50%)',
              fontSize: '17px',
              fontFamily: 'Pavanam'
            }}>Login Using Spotify</button>
            </div>
      )
    }
      else {
        let link = window.location.href.slice(26, window.location.href.length-1)
        return(
            <Router>
              <div>
                      <div style={{ backgroundColor: '#98ACC3' }}>
                      <Navbar style={{ backgroundColor: '#98ACC3' }}>
                      <Navbar.Brand style={{ backgroundColor: '#98ACC3' }}><img src={MusicMap} className="nav-logo" style={{width: '200px', height: '57px'}}/></Navbar.Brand>
                          <Navbar.Collapse className="justify-content-left">
                          <Nav style={{ backgroundColor: '#98ACC3' }}>
                            <Link to={`/home${link}`} className="navbar-link" style={{color: 'white', fontWeight: 'bold'}}>Home</Link>
                            <Link to={`/playlists${link}`} className="navbar-link" style={{color: 'white', fontWeight: 'bold'}}>My Playlists</Link>
                          </Nav>
                          </Navbar.Collapse>
                          <Navbar.Collapse className="justify-content-end">
                          <Nav style={{ backgroundColor: '#98ACC3' }}>
                            <Link to="/" className="navbar-link" onClick={this.logout} style={{color: 'white', fontWeight: 'bold'}}>Sign out</Link>
                          </Nav>
                          </Navbar.Collapse>
                      </Navbar>
                      </div> 
                <div >
                      <Route path={`/home`} render={() => <MainContainer spotifySearch={this.spotifySearch} user={this.state.user} songs={this.state.songs} savePlaylist={this.savePlaylist} savePlaylistToSpotify={this.savePlaylistToSpotify}/>}/>
                      <Route path={`/playlists`} render={() => <PlaylistsContainer userId={this.state.userId} user={this.state.user}/>}/>
                </div> 
              </div>
              </Router>
        )  
      }
    }
  }

export default App;
