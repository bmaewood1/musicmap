import React from 'react';
import Search from '../components/Search.js'
import HomePlaylist from '../components/HomePlaylist.js'

class MainContainer extends React.Component{

    constructor(){
        super()
        this.state={
            cityId: null,
            cityName: null,
            allEvents: [],
            artistNames: [], 
            events: []
        }
    }

    handleCitySearch = (city) => {
        fetch(`https://api.songkick.com/api/3.0/search/locations.json?query=${city}&apikey=r4d7PTJAcB8xIJ3g`)
        .then(resp => resp.json())
        .then(data => {this.setState({
            cityId: data.resultsPage.results.location[0].metroArea.id,
            cityName: data.resultsPage.results.location[0].metroArea.displayName
            })
        })
        // .then(this.eventSearch(this.state.cityId))
        if(this.state.cityId){
            fetch(`https://api.songkick.com/api/3.0/metro_areas/${this.state.cityId}/calendar.json?apikey=r4d7PTJAcB8xIJ3g`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    allEvents: data.resultsPage.results.event.slice(0, 5)
                })
            })
            // .then(this.state.allEvents.forEach(event => {
            //     this.setState({
            //         allEvents2: [...this.state.allEvents2, {
            //             id: event.id
            //         }]
            //     })
            // }))
            
        this.handleConcerts(this.state.allEvents)
        }
    }

    //pull event state up a level
    //componentdidupdate - if getting new props (songs) then set state within main

    handleConcerts = (allEvents) => {
        if(allEvents){
            let artists = []
            artists = allEvents.map(event => (
                {name: event.performance[0].displayName, id: event.id}
            ))
            this.setState({
                artistNames: artists
            })
            if(this.state.artistNames.length > 0){
                this.state.artistNames.forEach(name => this.props.spotifySearch(name))
            }
        }
    }

    componentDidUpdate(prevProps, prevState){
        // if(prevState.allEvents.length === 5){
        //     this.state.allEvents.map(event => {
        //         this.setState({
        //             events: [...this.state.events, {
        //                 id: event.id
        //             }]
        //         })
        //     })
        // }
        if(prevProps.songs){
            this.state.allEvents.forEach(event => {
                this.props.songs.forEach(song => {
                    if(event.id === song.id){
                        event.url = song.url
                    }
                })
            })
            this.state.allEvents.forEach(event => {
                this.props.songs.forEach(song => {
                    if(event.id === song.id){
                        event.track = song.title
                    }
                })
            })
        }
    }

    render(){
        return(
            <div>    
                <Search handleCitySearch={this.handleCitySearch}/>
                <HomePlaylist allEvents={this.state.allEvents} cityName={this.state.cityName} savePlaylist={this.props.savePlaylist}/>
            </div>
        )
    }
}

export default MainContainer;