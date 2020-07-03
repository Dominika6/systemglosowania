import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class NewPassword extends Component{

    constructor(props) {
        super(props);
        this.state = { changePassword:[] };
        this.passwordChange = this.passwordChange.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
    }

    initialState = {
        userid:'', oldPassword:'', newPassword:''
    }

    submitPassword = event => {
        event.preventDefault()
        axios.put("http://localhost:8080/api/user/updatePassword/" + this.state.userid + "/" + this.state.oldPassword + "/" + this.state.newPassword)
            .then(response => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert(response.data);
                    window.location.reload();
                }
            });
    }

    passwordChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render(){
        const {userid, oldPassword, newPassword} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Form onReset={this.resetAnswer} onSubmit={this.submitPassword} id="passwordFormId">

                <Card.Header>
                    <Form.Label><FontAwesomeIcon icon={faEdit} /> &nbsp; Edit Your Password: </Form.Label></Card.Header>
                <div>
                    <br/>
                    <Form.Group as={Col} controlId="formGridNewPassword">
                        <Form.Label>Your ID:</Form.Label>
                        <Form.Control required name="userid" value={userid}
                                      onChange={this.passwordChange} autoComplete="off"
                                      className="bg-dark text-white"
                                      placeholder="Enter Your Id"/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNewPassword">

                        <Form.Label>Old Password:</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="oldPassword" onChange={this.passwordChange}
                                      value={oldPassword}
                                      className="bg-dark text-white"
                                      placeholder="Enter old password" input type="password"/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNewPassword">

                        <Form.Label>New Password:</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="newPassword" onChange={this.passwordChange}
                                      value={newPassword}
                                      className="bg-dark text-white"
                                      placeholder="Enter new password" input type="password" />
                    </Form.Group>
                </div>
                </Form>
                <br/>
                <Card.Footer style={{"textAlign":"right"}}>
                    <Button size="sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
                    </Button> {' '}
                    <Button  size="sm" variant="info" type="reset">
                        <FontAwesomeIcon icon={faUndo} />&nbsp; Reset
                    </Button>
                </Card.Footer>
            </Card>
        );
    };
}
