import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {getCurrentUser1} from "./Login";

export default class NewPassword extends Component{

    constructor(props) {
        super(props);
        this.state = { changePassword: []};
        this.passwordChange1 = this.passwordChange1.bind(this);
        this.passwordChange2 = this.passwordChange2.bind(this);
        this.passwordChange3 = this.passwordChange3.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
    }

    initialState = {
         oldPassword:'', newPassword:'', confirmNewPassword:''
    }

    submitPassword = event => {
        const userid = getCurrentUser1();

        if(!userid) {
            alert("niezalogowany");
            return;
        }

        event.preventDefault()
        axios.put("http://localhost:8080/api/user/updatePassword/" + userid.id + "/" + this.state.oldPassword + "/" + this.state.newPassword + "/" + this.state.confirmNewPassword)
            .then(response => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert(response.data);
                    window.location.reload();
                }
            });
    }

    passwordChange1 = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    passwordChange2 = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    passwordChange3 = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render(){
        const { oldPassword, newPassword, confirmNewPassword} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <Form.Label>
                        <FontAwesomeIcon icon={faEdit} />
                        &nbsp; Edit Your Password:
                    </Form.Label>
                </Card.Header>
                <Form onSubmit={this.submitPassword} id="passwordFormId">
                    <Card.Body>
                        <Form.Group as={Col} controlId="formGridOldPassword">
                            <Form.Label>Old Password:</Form.Label>
                            <Form.Control required autoComplete="off" type="password"
                                          name="oldPassword" onChange={this.passwordChange1}
                                          defaultValue={oldPassword}
                                          className="bg-dark text-white"
                                          placeholder="Enter old password" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridNewPassword">
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control required autoComplete="off" type="password"
                                          name="newPassword" onChange={this.passwordChange2}
                                          defaultValue={newPassword}
                                          className="bg-dark text-white"
                                          placeholder="Enter new password" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridConfirmPassword">
                            <Form.Label>Confirm New Password:</Form.Label>
                            <Form.Control required autoComplete="off" type="password"
                                          name="confirmNewPassword" onChange={this.passwordChange3}
                                          defaultValue={confirmNewPassword}
                                          className="bg-dark text-white"
                                          placeholder="Confirm new password" />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    };
}
