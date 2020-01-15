import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SongCard = (props) => {
    let songSource = `https://open.spotify.com/embed/track/`
    if(props.event.track){
    return(
        <div>
            <ListGroup>
                <ListGroup.Item key={props.event.id}>
                    Artist: {props.event.performance[0].displayName}
                    <br></br>
                    Date: {props.event.start.date}
                    <br></br>
                    Venue: {props.event.venue.displayName}
                    <br></br>
                    Type: {props.event.type}
                    <br></br>
                    Link: <a href={props.event.uri}>Here</a>
                    <br></br>
                    <iframe src= {songSource + props.event.track.id} width="300" height="80" allowtransparency="true" allow="encrypted-media"></iframe>
                    <br></br>

                </ListGroup.Item>
            </ListGroup>
        </div>
    )
    }else{
        return(
            <div>

            </div>
        )
    }
}

export default SongCard;