import React, {Component} from "react";

import {Button, Card, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faSave} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class UserData extends Component{

    constructor(props) {
        super(props);
        this.state = { users:[] };
        this.getUserData= this.getUserData.bind(this);
    }

    getUserData = event =>{
        event.preventDefault()
        axios.get("http://localhost:8080/api/user/getUserById/" + this.state.userid)
            .then(response => response.data)
            .then((data) => {
                this.setState({users: data});
            });
    }

    componentDidMount() {
        // this.findMyAnswers();
    }

    idChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        const {userid} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Form id="userDatas" onSubmit={this.getUserData}>

                    <Card.Header ><FontAwesomeIcon icon={faAddressBook}/> &nbsp; Your Details </Card.Header>

                    <Card.Body>
                        <Form.Group as={Col} controlId="formGridUserData">
                            <Form.Label>Your ID:</Form.Label>
                            <Form.Control required name="userid" value={userid}
                                          onChange={this.idChange} autoComplete="off"
                                          className="bg-dark text-white"
                                          placeholder="Enter Your Id"/>
                        </Form.Group>

                        <br/>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
                            </Button>
                        </Card.Footer>
                        <br/>

                        <div>

                            {this.state.users.map((user) => (
                                <ul key={user.id}>
                                    <h4>Your details: </h4>
                                    <br/>
                                    <li>Name: &nbsp; &nbsp;{user.name}</li>
                                    <li>Email: &nbsp; &nbsp; {user.email}</li>
                                </ul>
                            ))}
                        </div>
                    </Card.Body>
                </Form>
            </Card>
        );
    };
}
