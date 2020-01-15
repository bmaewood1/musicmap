import React from 'react';
import { ListGroup } from 'react-bootstrap';

const PlaylistSongCard = (props) => {
    let songSource = `https://open.spotify.com/embed/track/`
    return(
        <div>
            <ListGroup>
            <ListGroup.Item key={props.song.id}>
                    <button type="button" class="close" aria-label="Close" onClick={() => props.removeSong(props.song)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    Title: {props.song.title}
                    <br></br>
                    Artist: {props.song.artist}
                    <br></br>
                    <iframe src= {songSource + props.song.track_id} width="300" height="80" allowtransparency="true" allow="encrypted-media"></iframe>
                    <br></br>
                    Upcoming Gig:
                    <br></br>
                    Date: {props.song.date}
                    <br></br>
                    Venue: {props.song.venue}
                    <br></br>
                    Category: {props.song.category}
                    <br></br>
                    Ticket Link: <a href={props.song.songkick_url}>Here</a>

                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default PlaylistSongCard;