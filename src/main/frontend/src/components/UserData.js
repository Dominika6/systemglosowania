import React, {Component} from "react";

import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {getCurrentUserId} from "./Login";

export default class UserData extends Component{

    constructor(props) {
        super(props);
        this.state = { users:[] };
        this.getUserData= this.getUserData.bind(this);
    }

    getUserData = () =>{
        const userid = getCurrentUserId();
        if (!userid) {
            alert('niezalogowany');
            return;
        }
        axios.get("http://localhost:8080/api/user/getUserById/" + userid)
            .then(response => response.data)
            .then((data) => {
                this.setState({users: data});
            });
    }

    componentDidMount() {
        this.getUserData();
    }

    // idChange = event => {
    //     this.setState({
    //         [event.target.name]:event.target.value
    //     });
    // }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header ><FontAwesomeIcon icon={faAddressBook}/> &nbsp; Your Details </Card.Header>
                <Card.Body>
                    <div>
                        {this.getUserData()}
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
