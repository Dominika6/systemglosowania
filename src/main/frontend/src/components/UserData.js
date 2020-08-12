import React, {Component} from "react";

import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {getCurrentUser1} from "./Login";

export default class UserData extends Component{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = { users:[] };
    }

    componentDidMount() {
        this._isMounted = true;
            const user = getCurrentUser1();
            if (!user) {
                alert('niezalogowany');
                return;
            }
            axios.get("http://localhost:8080/api/user/getUserById/" + user.id)
                .then(response => response.data)
                .then((data) => {
                    this.setState({users: data});

                });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header ><FontAwesomeIcon icon={faAddressBook}/> &nbsp; Your Details </Card.Header>
                <Card.Body>
                    <div>
                        {this.state.users.map((user) => (
                            <ul key={user.id}>
                                <li>Name: &nbsp; &nbsp;{user.name}</li>
                                <li>Email: &nbsp; &nbsp; {user.email}</li>
                            </ul>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        );
    };
}
