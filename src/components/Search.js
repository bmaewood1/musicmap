import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import Autocomplete from './Autocomplete';

const cities = [ 
    'New York', 
    'Los Angeles', 
    'Chicago', 
    'Houston', 
    'Phoenix', 
    'Philadelphia', 
    'San Antonio', 
    'San Diego', 
    'Dallas', 
    'San Jose', 
    'Austin', 
    'Jacksonville', 
    'Fort Worth', 
    'Columbus', 
    'San Francisco', 
    'Charlotte', 
    'Indianapolis', 
    'Seattle', 
    'Denver', 
    'Washington', 
    'Boston', 
    'El Paso', 
    'Detroit', 
    'Nashville', 
    'Portland', 
    'Memphis', 
    'Oklahoma City', 
    'Las Vegas', 
    'Louisville', 
    'Baltimore', 
    'Milwaukee', 
    'Albuquerque', 
    'Tucson', 
    'Fresno', 
    'Mesa', 
    'Sacramento', 
    'Atlanta', 
    'Kansas City', 
    'Colorado Springs', 
    'Miami', 
    'Raleigh', 
    'Omaha', 
    'Long Beach', 
    'Virginia Beach', 
    'Oakland', 
    'Minneapolis', 
    'Tulsa', 
    'Arlington', 
    'Tampa', 
    'New Orleans', 
    'Wichita', 
    'Cleveland', 
    'Bakersfield', 
    'Aurora', 
    'Anaheim', 
    'Honolulu', 
    'Santa Ana', 
    'Riverside', 
    'Corpus Christi', 
    'Lexington', 
    'Stockton', 
    'Henderson', 
    'Saint Paul', 
    'St. Louis', 
    'Cincinnati', 
    'Pittsburgh', 
    'Greensboro', 
    'Anchorage', 
    'Plano', 
    'Lincoln', 
    'Orlando', 
    'Irvine', 
    'Newark', 
    'Toledo', 
    'Durham', 
    'Chula Vista', 
    'Fort Wayne', 
    'Jersey City', 
    'St. Petersburg', 
    'Laredo', 
    'Madison', 
    'Chandler', 
    'Buffalo', 
    'Lubbock', 
    'Scottsdale', 
    'Reno', 
    'Glendale', 
    'Gilbert', 
    'Winston–Salem', 
    'North Las Vegas', 
    'Norfolk', 
    'Chesapeake', 
    'Garland', 
    'Irving', 
    'Hialeah', 
    'Fremont', 
    'Boise', 
    'Richmond', 
    'Baton Rouge', 
    'Spokane', 
    'Des Moines', 
    'Tacoma', 
    'San Bernardino', 
    'Modesto', 
    'Fontana', 
    'Santa Clarita', 
    'Birmingham', 
    'Oxnard', 
    'Fayetteville', 
    'Moreno Valley', 
    'Rochester', 
    'Glendale', 
    'Huntington Beach', 
    'Salt Lake City', 
    'Grand Rapids', 
    'Amarillo', 
    'Yonkers', 
    'Aurora', 
    'Montgomery', 
    'Akron', 
    'Little Rock', 
    'Huntsville', 
    'Augusta', 
    'Port St. Lucie', 
    'Grand Prairie', 
    'Columbus', 
    'Tallahassee', 
    'Overland Park', 
    'Tempe', 
    'McKinney', 
    'Mobile', 
    'Cape Coral', 
    'Shreveport', 
    'Frisco', 
    'Knoxville', 
    'Worcester', 
    'Brownsville', 
    'Vancouver', 
    'Fort Lauderdale', 
    'Sioux Falls', 
    'Ontario', 
    'Chattanooga', 
    'Providence', 
    'Newport News', 
    'Rancho Cucamonga', 
    'Santa Rosa']

class Search extends React.Component{

    state = {
        searchedCity: '',
        timeFrame: ''
    }


    handleCityChange = (city) => {
        console.log(city)
        this.setState({
            searchedCity: city
        })
    }

    handleTimeChange = (e) => {
        if(e.target.value !== " ")
        this.setState({
            timeFrame: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSearch(this.state.searchedCity)
    }

    
    render(){
        return(
            <div>
                <Form>
                    <Form.Group>
                        <Autocomplete
                            suggestions={cities}
                            handleCityChange={this.handleCityChange}
                            type="city" placeholder="" 
                            value={this.state.searchedCity}  
                        />
                        {/* <Form.Label></Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">City      </InputGroup.Text>
                            </InputGroup.Prepend>
                                <Form.Control aria-label="City:" aria-describedby="inputGroup-sizing-default" type="city" placeholder="" value={this.state.searchedCity} onChange={(e) => this.handleCityChange(e)} />
                        </InputGroup> */}
                        {/* <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Timeframe</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control aria-label="Timeframe:" as="select" placeholder="" value={this.state.timeFrame} onChange={(e) => this.handleTimeChange(e)}>
                                <option> </option>
                                <option>1 month</option>
                                <option>2 months</option>
                                <option>3 months</option>
                                <option>4 months</option>
                                <option>5 months</option>
                                <option>6 months</option>
                            </Form.Control>                        
                        </InputGroup> */}
                        <Form.Text className="text-muted">
                        </Form.Text>
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>

            </div>
        )
    }
}

export default Search;