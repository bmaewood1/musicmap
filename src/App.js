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
import {Navbar} from 'react-bootstrap';
import MusicMap from './MusicMap.png';
import SpotifyPlayer from 'react-spotify-web-playback';
import Spotify from './containers/Spotify';


class App extends React.Component {

  // constructor() 
  // {
  //   super();
  //   this.state = {
  //     accessToken: this.getHashParams().access_token,
  //     refreshToken: this.getHashParams().refresh_token,
  //     tokenTime: Date.now()
  //   }
  // }

  state = {
    accessToken: null,
    refreshToken: null,
    tokenTime: null,
    user: null,
    userId: null,
    filterString: '',
    songs: []
  }


  getHashParams() {
    let path = window.location.pathname;
    let removeSlash = path.split("/");
    let separatedKeys = queryString.parse(removeSlash[1]);
    return separatedKeys;
  }


  // state = {
  //   user: null,
  //   userId: null,
  //   filterString: '', 
  //   users: [],
  //   songs: [],
  //   accessToken: null
  // }

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
          //   {
          //   //musicmap
          //   artist: artist_name.name,
          //   musicmapid: artist_name.id,
          //   //spotify
          //   uri: data.tracks.items[0].uri,
          //   id: data.tracks.items[0].id,
          //   type: data.tracks.items[0].type,
          //   media_type: "audio",
          //   name: data.tracks.items[0].name,
          //   is_playable: data.tracks.items[0].is_playable,
          //   album: {
          //     uri: data.tracks.items[0].album.uri,
          //     name: data.tracks.items[0].album.name,
          //     images: [{url: data.tracks.items[0].images[0].url}],
          //     artists: [{uri: data.tracks.items[0].artists[0].uri}]
          //   }
          // }
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

    savePlaylist = (playlist, city) => {
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
            // //event
            date: song.start.date, 
            venue: song.venue.displayName,
            category: song.type,
            songkick_url: song.uri
          })
        })
    })
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
  logout = async (e) => {
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
        <div className = "loginPageDiv">
          <h1>Welcome to MusicMap!</h1>
            <button onClick={() => window.location='http://localhost:8888/login'}>Login Using Spotify</button>
            </div>
      )
    }
      else {
        return(
        <div>
            <Router>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand className="navbar-brand">
                        <img src={MusicMap} className="nav-logo"/>
                    </Navbar.Brand>
                    <Link to="/" className="navbar-link">Home</Link>
                    <Link to="/playlists" className="navbar-link">My Playlists</Link>
                        {/* <Route
                            path="/playlists"
                            component={PlaylistsContainer} 
                        /> */}
                </Navbar>
              </Router>
              <button onClick={(e) => this.logout(e)}>Sign out</button>

          <div>
            <h1>
              {this.state.user}'s Dashboard
            </h1>
            <MainContainer spotifySearch={this.spotifySearch} songs={this.state.songs} savePlaylist={this.savePlaylist}/>
            <PlaylistsContainer userId={this.state.userId}/>
          </div> 
        </div>
        )  
      }
    }
  }

export default App;
