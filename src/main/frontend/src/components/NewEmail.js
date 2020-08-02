import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {getCurrentUserId} from "./Login";

export default class NewEmail extends Component{

    constructor(props) {
        super(props);
        this.state = { changeEmail:[] };
        this.emailChange = this.emailChange.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
    }

    initialState = {
        userid:'', email:''
    }

    submitEmail = event => {
        const userid = getCurrentUserId();

        if (!userid) {
            alert('niezalogowany');
            return;
        }

        const encodedEmail = encodeURIComponent(this.state.email);
        event.preventDefault()
        axios.put("http://localhost:8080/api/user/updateUserEmail/" + userid + "/" + encodedEmail)
            .then(response => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert(response.data);
                    window.location.reload();
                }
            });
    }

    emailChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }


    render(){
        const { email} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Form onReset={this.resetAnswer} onSubmit={this.submitEmail} id="emailFormId">
                    <Card.Header>
                        <Form.Label>
                            <FontAwesomeIcon icon={faEdit} /> &nbsp; Edit Email Address:
                        </Form.Label>
                    </Card.Header>
                    <div>
                        <br/>
                        <Form.Group as={Col} controlId="formGridNewEmail">
                        <Form.Label>New email:</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="email" onChange={this.emailChange}
                                      value={email}
                                      className="bg-dark text-white"
                                      placeholder="Enter new email address" />
                        </Form.Group>
                    </div>
                    <br/>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
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
