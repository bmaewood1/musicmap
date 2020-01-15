import React from 'react';
import Search from '../components/Search.js'
import HomePlaylist from '../components/HomePlaylist.js'

class MainContainer extends React.Component{

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, month, day].join('-');
    }

    addDays = (theDate, days) => {
        return new Date(theDate.getTime() + days*24*60*60*1000);
    }


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
        let today = new Date()
        let first = today.toString().slice(0,10)
        let second = today.toString().slice(11, 15)
        let join = first + ',' + second
        let min_date = (this.formatDate(join))
        let newDate = this.addDays(today, 60);
        let first2 = newDate.toString().slice(0,10)
        let second2 = newDate.toString().slice(11,15)
        let join2 = first2 + ',' + second2
        let max_date = (this.formatDate(join2))
        fetch(`https://api.songkick.com/api/3.0/search/locations.json?query=${city}&apikey=r4d7PTJAcB8xIJ3g`)
        .then(resp => resp.json())
        .then(data => {this.setState({
            cityId: data.resultsPage.results.location[0].metroArea.id,
            cityName: data.resultsPage.results.location[0].metroArea.displayName
            })
        })
        if(this.state.cityId){
            fetch(`https://api.songkick.com/api/3.0/metro_areas/${this.state.cityId}/calendar.json?min_date=${min_date}&max_date=${max_date}&apikey=r4d7PTJAcB8xIJ3g`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    allEvents: data.resultsPage.results.event.slice(0, 5)
                })
            })
        this.handleConcerts(this.state.allEvents)
        }
    }

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
        if(prevProps.songs){
            this.state.allEvents.forEach(event => {
                this.props.songs.forEach(song => {
                    if(event.id === song.artist.id){
                        event.track = song.track
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