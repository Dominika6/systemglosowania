import React, {Component} from "react";

import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getIsLoggedAsAdmin, getIsLoggedIn, logout} from "./Login";

export default class NavigationBar extends Component{

    render(){
        const isAdmin = getIsLoggedAsAdmin();
        const isLogged = getIsLoggedIn();

        return(
            <Navbar bg="dark" variant="dark">
                {!isAdmin && <Nav className="mr-auto">
                    <Link to={""} className="navbar-brand"> YourVote </Link>
                    <Link to={"/editAccount"} className="nav-link"> Edit Account </Link>
                    <Link to={"/castYourVote"} className="nav-link"> Cast Your Vote </Link>
                </Nav>}
                {isAdmin && <Nav className="mr-auto">
                    <Link to={"/admin"} className="navbar-brand"> Your Vote - Admin Panel: </Link>

                        <Link to={"/admin/yourAccount"} className="nav-link"> Your Account </Link>
                        <Link to={"/admin/manageUserAccounts"} className="nav-link"> Manage User Accounts </Link>
                        <Link to={"/admin/manageSurveys"} className="nav-link"> Manage Surveys </Link>
                        <Link to={"/admin/surveyResults"} className="nav-link"> Survey Results </Link>

                </Nav>}
                {isLogged && <Button align="right" variant="danger" onClick={() => logout()}>Log out</Button>}
            </Navbar>
        );
    }
}

