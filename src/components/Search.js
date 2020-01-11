import React from 'react';
import { Form, Button } from 'react-bootstrap';

class Search extends React.Component{

    state = {
        searchedCity: ''
    }

    handleChange = (e) => {
        this.setState({
            searchedCity: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleCitySearch(this.state.searchedCity)
        // this.setState({
        //     searchedCity: ''
        // })
    }

    
    render(){
        return(
            <div>
                <Form>
                    <Form.Group>
                        Enter a city:
                        <Form.Label></Form.Label>
                        <Form.Control type="city" placeholder="" value={this.state.searchedCity} onChange={(e) => this.handleChange(e)}/>
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