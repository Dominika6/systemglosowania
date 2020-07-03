import React, {Component} from "react";

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component{


    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    YourVote
                </Link>
                <Nav className="mr-auto">
                    <Link to={"editAccount"} className="nav-link"> Edit Account </Link>
                    <Link to={"castYourVote"} className="nav-link"> Cast Your Vote </Link>
                </Nav>
                <Link to={"/admin/yourAccount"} className="navbar-brand"> Admin Panel: </Link>
                <Nav>
                    <Link to={"/admin/yourAccount"} className="nav-link"> Your Account </Link>
                    <Link to={"/admin/manageUserAccounts"} className="nav-link"> Manage User Accounts </Link>
                    <Link to={"/admin/manageSurveys"} className="nav-link"> Manage Surveys </Link>
                    <Link to={"/admin/surveyResults"} className="nav-link"> Survey Results </Link>

                </Nav>
            </Navbar>
        );
    }
}

