import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class AdminDeleteUser extends Component{

    constructor(props) {
        super(props);
        this.state = { changeEmail:[] };
        this.nameChange = this.nameChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    initialState = {
        userid:''
    }

    deleteUser = event => {
        event.preventDefault()
        axios.delete("http://localhost:8080/api/user/deleteUserById/" + this.state.userid)
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
        const {userid} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Form onSubmit={this.deleteUser} id="nameFormId">
                    <Card.Header>
                        <Form.Label><FontAwesomeIcon icon={faTrash} /> &nbsp; Delete user: </Form.Label></Card.Header>
                    <div>
                        <br/>
                        <Form.Group as={Col} controlId="formGridId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control required name="userid" value={userid}
                                          onChange={this.nameChange} autoComplete="off"
                                          className="bg-dark text-white"
                                          placeholder="Enter the user ID you want to delete. "/>
                        </Form.Group>
                    </div>

                    <br/>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="danger" type="submit">
                            <FontAwesomeIcon icon={faTrash} />&nbsp; Delete
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    };
}
