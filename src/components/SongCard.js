import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SongCard = (props) => {
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
                    Song: <a href={props.event.url}>song</a>

                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default SongCard;