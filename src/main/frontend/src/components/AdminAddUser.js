import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


export default class AdminAddUser extends Component{

    constructor(props) {
        super(props);
        this.state = { changeEmail:[], selectedOption:"" };
        this.emailChange = this.emailChange.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
    }

    initialState = {
        email:'', name:'', password:'', role:''
    }

    submitEmail = event => {
        event.preventDefault()
        console.log(this.state.email + "/" + this.state.name + "/" + this.state.password  + "/" +this.state.selectedOption)
        axios.post("http://localhost:8080/api/user/addUser/" + this.state.email + "/" + this.state.name + "/" + this.state.password  + "/" +this.state.selectedOption)
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

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    render(){
        const {email, name, password} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> &nbsp; AddUser </Card.Header>

                <Form onReset={this.resetAnswer} onSubmit={this.submitEmail} id="emailFormId">
                    <div>
                        <br/>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="email" onChange={this.emailChange}
                                          value={email}
                                          className="bg-dark text-white"
                                          placeholder="Enter Email Address"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="name" onChange={this.emailChange}
                                          value={name}
                                          className="bg-dark text-white"
                                          placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPasswword">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control required autoComplete="off"
                                        name="password" onChange={this.emailChange}
                                        value={password} type={"password"}
                                        className="bg-dark text-white"
                                        placeholder="Enter a Temporary Password" />
                        </Form.Group>

                        <Form.Group controlId="formGridRole" className="m-3">
                            <Form.Label>Role: </Form.Label>
                            <br/>
                            <Col sm={10} className="ml-3">
                            <input
                                value="USER" type="radio" name="role" id="formUser"
                                checked={this.state.selectedOption === 'USER'}
                                onChange={this.handleOptionChange}
                                className="form-check-input"/> User
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <input
                                value="ADMIN" type="radio" name="role" id="formAdmin"
                                checked={this.state.selectedOption === 'ADMIN'}
                                onChange={this.handleOptionChange}
                                className="form-check-input"/> Admin
                            </Col>
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
