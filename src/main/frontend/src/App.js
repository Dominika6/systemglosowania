import React from 'react';
import './App.css';
import { Route } from "react-router-dom"
import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router} from 'react-router-dom';

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import EditAccount from "./components/EditAccount";
import CastYourVote from "./components/CastYourVote";
import AdminManageUserAccounts from "./components/AdminManageUserAccounts";
import AdminManageSurveys from "./components/AdminManageSurveys";
import AdminSurveyResults from "./components/AdminSurveyResults";
import Switch from "react-bootstrap/cjs/Switch";
import AdminAccount from "./components/AdminAccount";
import Login, {getIsLoggedAsAdmin, getIsLoggedIn} from "./components/Login";

export default function App() {

    const marginTop = {
        marginTop:"20px"
    };

    const isLoggedIn= getIsLoggedIn();

    const isAdmin = getIsLoggedAsAdmin();


    return (
        <Router>
            {isLoggedIn && <NavigationBar/>}
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            {!isLoggedIn && <Route path="/" exact component={Login}/>}

                            {isLoggedIn && <>
                                <Route path="/" exact component={Welcome}/>
                                <Route path="/editAccount" exact component={EditAccount}/>
                                <Route path="/castYourVote" exact component={CastYourVote}/>
                            </>}

                            {isAdmin && <>

                                <Route path="/admin/yourAccount" exact component={AdminAccount}/>
                                <Route path="/admin/manageUserAccounts" exact component={AdminManageUserAccounts}/>
                                <Route path="/admin/manageSurveys" exact component={AdminManageSurveys}/>
                                <Route path="/admin/surveyResults" exact component={AdminSurveyResults}/>
                            </>}

                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}


