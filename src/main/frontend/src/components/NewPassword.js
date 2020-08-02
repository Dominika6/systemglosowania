import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {getCurrentUser1, getCurrentUserId} from "./Login";

export default class NewPassword extends Component{

    constructor(props) {
        super(props);
        //{oldPassword:'', newPassword:'', confirmNewPassword:'' }
        this.state = { changePassword: []};
        this.passwordChange1 = this.passwordChange1.bind(this);
        this.passwordChange2 = this.passwordChange2.bind(this);
        this.passwordChange3 = this.passwordChange3.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
    }

    //userid:'',
    initialState = {
         oldPassword:'', newPassword:'', confirmNewPassword:''
    }

    submitPassword = event => {
        console.log("submited")
        const userid = getCurrentUser1();

        if(!userid) {
            alert("niezalogowany");
            return;
        }
        console.log(userid)
        //
        // console.log("new1:" + this.state.newPassword);
        // console.log("new2:" + this.state.confirmNewPassword);
        //
        // if(this.state.newPassword !== this.state.confirmNewPassword){
        //     alert("podane hasła się różnią");
        //     return;
        // }

        event.preventDefault()
        console.log("http://localhost:8080/api/user/updatePassword/" + userid.id + "/" + this.state.oldPassword + "/" + this.state.newPassword + "/" + this.state.confirmNewPassword)
        axios.put("http://localhost:8080/api/user/updatePassword/" + userid.id + "/" + this.state.oldPassword + "/" + this.state.newPassword + "/" + this.state.confirmNewPassword)
            .then(response => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert(response.data);
                    window.location.reload();
                }
            });
    }

    // wypisz = () =>{
    //     console.log("tutaj")
    // }

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
                {/*<div>*/}
                {/*    <br/>*/}
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
                    {/*było input type="password*/}

                    <Form.Group as={Col} controlId="formGridConfirmPassword">
                        <Form.Label>Confirm New Password:</Form.Label>
                        <Form.Control required autoComplete="off" type="password"
                                      name="confirmNewPassword" onChange={this.passwordChange3}
                                      defaultValue={confirmNewPassword}
                                      className="bg-dark text-white"
                                      placeholder="Confirm new password" />
                    </Form.Group>
                {/*</div>*/}
                {/*<br/>*/}
            </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                    <Button size="sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
                    {/*</Button> {' '}*/}
                    {/*<Button  size="sm" variant="info" type="reset">*/}
                    {/*    <FontAwesomeIcon icon={faUndo} />&nbsp; Reset*/}
                    </Button>
                </Card.Footer>
                </Form>

            </Card>
        );
    };
}
