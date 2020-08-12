import React from 'react';
import './App.css';
import { Route } from "react-router-dom"
import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router} from 'react-router-dom';

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import EditAccount from "./components/EditAccount";
import AdminManageUserAccounts from "./components/AdminManageUserAccounts";
import AdminManageSurveys from "./components/AdminManageSurveys";
import Switch from "react-bootstrap/cjs/Switch";
import AdminAccount from "./components/AdminAccount";
import Login, {getIsLoggedAsAdmin, getIsLoggedIn, getIsLoggedAsUser} from "./components/Login";
import NavigationBar2 from "./components/NavigationBar2";
import WelcomeAdmin from "./components/WelcomeAdmin";
import AdminResults from "./components/AdminResults";
import Answers from "./components/Answers";

export default function App() {

    const marginTop = {
        marginTop:"20px"
    };

    const isLoggedIn= getIsLoggedIn();
    const isAdmin = getIsLoggedAsAdmin();
    const isUser= getIsLoggedAsUser();

    return (
        <Router>
            {isLoggedIn && <NavigationBar/>}
            {!isLoggedIn && <NavigationBar2/>}
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            {!isLoggedIn && <Route path="/" exact component={Login}/>}

                            {isLoggedIn && isUser && <>
                                <Route path="/" exact component={Welcome}/>
                                <Route path="/editAccount" exact component={EditAccount}/>
                                <Route path="/castYourVote" exact component={Answers}/>
                            </>}

                            {isLoggedIn && isAdmin && <>
                                <Route path="/" exact component={WelcomeAdmin}/>
                                <Route path="/admin" exact component={WelcomeAdmin}/>
                                <Route path="/admin/yourAccount" exact component={AdminAccount}/>
                                <Route path="/admin/manageUserAccounts" exact component={AdminManageUserAccounts}/>
                                <Route path="/admin/manageSurveys" exact component={AdminManageSurveys}/>
                                <Route path="/admin/surveyResults" exact component={AdminResults}/>
                            </>}
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}


