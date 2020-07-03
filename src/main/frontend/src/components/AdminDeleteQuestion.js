import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class AdminDeleteQuestion extends Component{

    constructor(props) {
        super(props);
        this.state = { changeEmail:[] };
        this.nameChange = this.nameChange.bind(this);
        this.submitName = this.submitName.bind(this);
    }

    initialState = {
        qid:''
    }

    submitName = event => {
        event.preventDefault()
        // console.log(this.state.qid)
        axios.delete("http://localhost:8080/api/questions/deleteQuestionById/" + this.state.qid)
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
        const {qid} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Form onSubmit={this.submitName} id="nameFormId">
                    <Card.Header>
                        <Form.Label><FontAwesomeIcon icon={faTrash} /> &nbsp; Delete question: </Form.Label></Card.Header>
                    <div>
                        <br/>
                        <Form.Group as={Col} controlId="formGridId">
                            <Form.Label>Question ID</Form.Label>
                            <Form.Control required name="qid" value={qid}
                                          onChange={this.nameChange} autoComplete="off"
                                          className="bg-dark text-white"
                                          placeholder="Enter the question ID you want to delete. "/>
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
