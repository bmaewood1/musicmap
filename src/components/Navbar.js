import React, { Component } from "react";
import {
  Navbar
} from 'react-bootstrap';
import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';
import MainContainer from "../containers/MainContainer";
import PlaylistsContainer from "../containers/PlaylistsContainer";

class NavbarClass extends React.Component {
    render(){
        return (
            <Router>
            
            <Navbar bg="light" variant="light">
                <Navbar.Brand>
                    <img src="" className="nav-logo"/>
                </Navbar.Brand>
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/playlists" className="navbar-link">My Playlists</Link>
                <Route
                        path="/"
                        component={MainContainer}
                        exact 
                    />
                    <Route
                        path="/playlists"
                        component={PlaylistsContainer} 
                    />


            </Navbar>
            </Router>

)
}
}


export default NavbarClass;
{/* <Nav className="mr-auto">
<Nav.Link href="#home">Home</Nav.Link>
<Nav.Link href="#features">My Playlists</Nav.Link>  
</Nav> */}