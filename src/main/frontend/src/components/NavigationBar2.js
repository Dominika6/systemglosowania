import React, {Component} from "react";

import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar2 extends Component{

    render(){

        //Navbar dla niezalogowanego

        return(
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    YourVote
                </Link>

            </Navbar>
        );
    }
}

