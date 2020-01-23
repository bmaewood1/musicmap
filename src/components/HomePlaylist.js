import React from 'react';
import SongCard from './SongCard.js';
import { Card, Button } from 'react-bootstrap';
import '../App.css'


class HomePlaylist extends React.Component{

    newTab = (url) => { 
        window.open(url, "_blank"); 
    }

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {scrollTop: 0}
      }

    onScroll = () => {
        const scrollTop = this.myRef.current.scrollTop
        this.setState({
          scrollTop: scrollTop
        })
      }

    render(){
        return(
            <div ref={this.myRef} onScroll={this.onScroll} style={{overflow: 'scroll', width: '770px', height: '600px'}} >
                <br></br>
                <b className="my-home-playlist" style={{paddingTop: '50px', paddingLeft: '50px'}}>{this.props.cityName} Playlist</b>
                <Card.Body >
                    <Card.Text>
                    {this.props.allEvents.map(event => <SongCard event={event} cityName={this.props.cityName} newTab={this.newTab}/>)}
                    </Card.Text>
                    <Button variant="secondary" size="lg" onClick={()=> this.props.savePlaylistToSpotify(this.props.allEvents, this.props.cityName)} style={{align: 'center'}} block>Save Playlist</Button>
                </Card.Body>
            </div>
            )

        }
    }

export default HomePlaylist;