import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {getCurrentUserId} from "./Login";
import {getApiUrl} from "../utils/apiUrl";

export default class NewName extends Component{

    constructor(props) {
        super(props);
        this.state = { changeEmail:[] };
        this.nameChange = this.nameChange.bind(this);
        this.submitName = this.submitName.bind(this);
    }

    initialState = {
        userid:'', name:''
    }

    submitName = event => {
        const userid = getCurrentUserId();

        if (!userid){
            alert('');
            return;
        }

        event.preventDefault()
        axios.put(getApiUrl() + "/api/user/updateUserName/" + userid + "/" + this.state.name)
            .then(response => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert(response.data);
                    window.location.reload();
                }
            });
    }

    nameChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render(){
        const { name} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Form onReset={this.resetAnswer} onSubmit={this.submitName} id="nameFormId">
                    <Card.Header>
                    <Form.Label><FontAwesomeIcon icon={faEdit} /> &nbsp; Edit Your Name: </Form.Label></Card.Header>
                    <div>
                        <br/>
                        <Form.Group as={Col} controlId="formGridNewName">
                            <Form.Label>New Name:</Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="name" onChange={this.nameChange}
                                          value={name}
                                          className="bg-dark text-white"
                                          placeholder="Enter new name" />
                        </Form.Group>
                    </div>
                    <br/>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} />&nbsp; Submit
                        </Button> {' '}
                        <Button  size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} />&nbsp; Reset
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    };
}
