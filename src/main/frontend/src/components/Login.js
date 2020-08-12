import React, {Component} from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";


export function getCurrentUser() {
    const savedUserJson = window.localStorage.getItem('currentUser');
    const savedUser = JSON.parse(savedUserJson);

    if (!savedUser) {
        return null;
    }
    return savedUser;
}

export function getCurrentUserId() {
    const user = getCurrentUser();
    if (!user) {
        return null;
    }
    return user.id;
}

export function getCurrentUser1() {
    const savedUserJson = window.localStorage.getItem('currentUser');
    return JSON.parse(savedUserJson);
}

export function getIsLoggedIn() {
    return !!getCurrentUser();
}

export function getIsLoggedAsAdmin() {
    const user = getCurrentUser();
    return !!user && user.role === 'ADMIN';
}

export function getIsLoggedAsUser() {
    const user = getCurrentUser();
    return !!user && user.role === 'USER';
}

export function logout() {
    window.localStorage.removeItem('currentUser');
    window.location.href = '/';
}

export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = { email:'', password:'', userid:'', changeEmail:[]};
        this.changeId = this.changeId.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.login = this.login.bind(this);
    }

    changeId = userid => {
        this.setState({userid: userid})
    }

    changeEmail = email => {
        this.setState({email: email})
    }

    changePassword = password => {
        this.setState({password: password})
    }

    login = event => {
        const encodedEmail = encodeURIComponent(this.state.email);
        event.preventDefault()
        axios.get("http://localhost:8080/api/user/login/" + encodedEmail + "/" + this.state.password)
            .then(response => {
                if(response.data === null){
                    alert("Nieprawidłowe dane")
                }
                if(response.data !== null) {
                    window.localStorage.setItem('currentUser', JSON.stringify(response.data));
                    window.location.reload()
                }
            });
    }

    emailChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Form onSubmit={this.login} id="loginFormId">
                    <Card.Header>
                        <Form.Label> <FontAwesomeIcon icon={faLock} /> &nbsp; Sign in </Form.Label></Card.Header>
                    <div>
                        <Form.Group as={Col} controlId="formGridNewEmail">
                            <Form.Control required autoComplete="off" type="email"
                                          name="email" onChange={this.emailChange}
                                          value={this.state.email}
                                          className="bg-dark text-white"
                                          placeholder="Email" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNewPassword">
                            <Form.Control required autoComplete="off" type="password"
                                          name="password" onChange={this.emailChange}
                                          value={this.state.password}
                                          className="bg-dark text-white"
                                          placeholder="Password" />
                        </Form.Group>
                    </div>
                    <br/>
                    <Card.Footer style={{"textAlign":"right"}}>
                        Press after entering the data: &nbsp;
                        <Button size="sm" variant="success" type="submit">
                            &nbsp;Login
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    };
}
