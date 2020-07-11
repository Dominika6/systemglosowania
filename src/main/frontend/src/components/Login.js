import React, {Component} from "react";

import {Card, Form, Button, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export function getCurrentUser() {
    const savedUserJson = window.localStorage.getItem('currentUser');
    const savedUser = JSON.parse(savedUserJson);

    if (!savedUser) {
        return null;
    }

    return savedUser[0];
}

export function getCurrentUserId() {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }
    return user.id;
}

export function getIsLoggedIn() {
    return !!getCurrentUser();
}

export function getIsLoggedAsAdmin() {
    const user = getCurrentUser();
    console.log('checking if admin', user);
    return !!user && user.role === 'ADMIN';
}

export async function getUserInfo(userId) {
        const response = await axios.get("http://localhost:8080/api/user/getUserById/" + userId);
        return response.data;

}

export function logout() {
    window.localStorage.removeItem('currentUser');
    window.location.href = '/';
    // window.location.reload();
}

export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = { userId:''};
        this.changeId = this.changeId.bind(this);
    }

    changeId = userId => {
        this.setState({userId: userId})
    }

    handleSubmit = async (event) => {
        if (!this.state.userId) {
            alert('Podaj id');
            return;
        }

        const userInfo = await getUserInfo(this.state.userId);

        if (!userInfo) {
            alert('zle id');
            return;
        }

        window.localStorage.setItem('currentUser', JSON.stringify(userInfo));
        window.location.reload();
    }

    handleLogoout = event => {
        window.localStorage.removeItem('currentUserId');
        window.location.reload();
    }

    render() {
        const {userid, qid} = this.state;

        return(
            <div>
                {getIsLoggedIn() && <>
                    <button onClick={this.handleLogoout}>Wyloguj sie</button>
                </>}
                {!getIsLoggedIn() && <>
                    user: <br/> 8a08a707-2897-444d-9112-c13d24e5a592
                    <br/> admin: <br/> 7f5caae4-2977-4638-badb-ff190bf44d17 <br/>
                    <input placeholder="Twoje id" value={this.state.userId} onChange={event => this.changeId(event.target.value)} />
                    <button onClick={this.handleSubmit}>Login</button>
                </>}

            </div>
        );
    };
}
