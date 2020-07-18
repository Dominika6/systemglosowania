import React, {Component} from "react";

import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import {getIsLoggedAsAdmin, getIsLoggedIn} from "./Login";

export default class NavigationBar2 extends Component{

    render(){

        // const isAdmin = getIsLoggedAsAdmin();
        // const isLogged = getIsLoggedIn();

        return(
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    YourVote
                </Link>

            </Navbar>
        );
    }
}

