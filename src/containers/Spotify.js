import React from 'react';
import Script from 'react-load-script';
import SpotifyPlayer from 'react-spotify-web-playback';



class Spotify extends React.Component{

    

    constructor(props) {
        super(props);
        this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
        this.handleLoadFailure = this.handleLoadSuccess.bind(this);
        this.cb = this.cb.bind(this);
        this.state = {
            scriptLoaded: '',
            scriptError: '',
            device_id: '',
            track: {
                context: {
                  uri: 'spotify:album:xxx', // The URI of the context (can be null)
                  metadata: {},             // Additional metadata for the context (can be null)
                },
                disallows: {                // A simplified set of restriction controls for
                  pausing: false,           // The current track. By default, these fields
                  peeking_next: false,      // will either be set to false or undefined, which
                  peeking_prev: false,      // indicates that the particular operation is
                  resuming: false,          // allowed. When the field is set to `true`, this
                  seeking: false,           // means that the operation is not permitted. For
                  skipping_next: false,     // example, `skipping_next`, `skipping_prev` and
                  skipping_prev: false      // `seeking` will be set to `true` when playing an
                                            // ad track.
                },
                paused: false,  // Whether the current track is paused.
                position: 0,    // The position_ms of the current track.
                repeat_mode: 0, // The repeat mode. No repeat mode is 0,
                                // once-repeat is 1 and full repeat is 2.
                shuffle: false, // True if shuffled, false otherwise.
                track_window: {
                    uri: "spotify:track:3OtkTatZsc4lRNUYd48llc",
                    id: "3OtkTatZsc4lRNUYd48llc",             
                    type: "track",            
                    media_type: "audio",     
                    name: "Tin Foil Drop",     
                    is_playable: true,    
                    album: {
                      uri: 'spotify:album:4vQPbETy0VZAU0kGiSFNHA',
                      name: 'Portrayal Of Guilt / Soft Kill Split',
                      images: [
                        { url: "https://i.scdn.co/image/377d705bac9326a2589fa833bd2413e032b32de4" }
                      ]
                    },
                    artists: [
                      { uri: 'spotify:artist:58rIPw8uw8LW01eQH7Mi7m', name: 'Soft Kill' }
                    ]
                  }
                  
              }
        }
        
      }

      componentDidMount(){
        window.onSpotifyWebPlaybackSDKReady = () => {
            this.handleLoadSuccess();
          };
      }

      handleLoadSuccess() {
        this.setState({ scriptLoaded: true });
        console.log("Script loaded");
        const token = 'BQCXNc0zHek-FMKbbl_sG254HHff3ImK890x1AzqnC40JVGopivCTAdv0JieD5Hvk5hkxNJa4AS7buU9ipfn2ElMu2YjFpJhy2DDMz2DlCpx4rAQEjpJpo6kscRXbysMXdyiyTE08tfuAUrdnH1O1vDG_UZ9HzYZ';
        const player = new window.Spotify.Player({
          name: 'MusicMap',
          getOAuthToken: cb => { cb(token); }
        })
        this.setState({
            device_id: player._options.id
        })
        console.log(player)
        if(player.connect()){
            console.log("success!", this.state.device_id)
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.state.device_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify({
                "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
                "offset": {
                  "position": 5
                },
                "position_ms": 0
              })
            })  
            
        }

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });
    
        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });
    
        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('The Web Playback SDK is ready to play music!');
          console.log('Ready with Device ID', device_id);
          
        });
    
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });
    
        // Connect to the player!
        player.connect();
        player.connect().then(success => {
            if (success) {
              console.log('The Web Playback SDK successfully connected to Spotify!');
            }
          })
      }

    
      cb(token) {
        return(token);
      }

    
      handleScriptCreate() {
        this.setState({ scriptLoaded: false });
        console.log("Script created");
      }
    
      handleScriptError() {
        this.setState({ scriptError: true });
        console.log("Script error");
      }
    
      handleScriptLoad() {
        this.setState({ scriptLoaded: true});
        console.log("Script loaded");
    
      }
      
    render(){
        return(
            <div>
                <Script
                    url="https://sdk.scdn.co/spotify-player.js"
                    onCreate={this.handleScriptCreate.bind(this)}
                    onError={this.handleScriptError.bind(this)}
                    onLoad={this.handleScriptLoad.bind(this)}
                />
                <SpotifyPlayer
                    token="BQCXNc0zHek-FMKbbl_sG254HHff3ImK890x1AzqnC40JVGopivCTAdv0JieD5Hvk5hkxNJa4AS7buU9ipfn2ElMu2YjFpJhy2DDMz2DlCpx4rAQEjpJpo6kscRXbysMXdyiyTE08tfuAUrdnH1O1vDG_UZ9HzYZ"
                    uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
                />;

            </div>
        )
    }

}

export default Spotify;