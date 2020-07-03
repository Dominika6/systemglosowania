import React, {Component} from "react";

import {Card, Form, Button, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class CastYourVote extends Component{

    constructor(props) {
        super(props);
        this.state = { surveys:[], selectedOption:""};
        this.answerChange = this.answerChange.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    }

    initialState = {
        userid:'', qid:'', answer:''
    }

    resetAnswer = () => {
        this.setState(() => this.initialState)
    }

    submitAnswer = event => {
        event.preventDefault()
        console.log( this.state.userid + "/" + this.state.qid +"/"+ this.state.selectedOption)
        axios.post("http://localhost:8080/api/survey/addAnswer/" + this.state.userid + "/" + this.state.qid +"/"+ this.state.selectedOption)
            .then(response => {
                alert(response.data);
                window.location.reload();
            });
    }

    answerChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    render() {
        const {userid, qid} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} />&nbsp; Add Answer</Card.Header>

                <Form onReset={this.resetAnswer} onSubmit={this.submitAnswer} id="answerFormId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridUserid">
                                <Form.Label>Your ID</Form.Label>
                                <Form.Control required autoComplete="off"
                                              name="userid"
                                              value={userid} onChange={this.answerChange}
                                              className="bg-dark text-white"
                                              placeholder="Enter Your ID" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridQid">
                                <Form.Label>Question ID</Form.Label>
                                <Form.Control required autoComplete="off"
                                              name="qid"
                                              value={qid} onChange={this.answerChange}
                                              className="bg-dark text-white"
                                              placeholder="Enter Question ID" />
                            </Form.Group>
                        </Form.Row>

                        <fieldset>
                            <Form.Group as={Row} controlId="formGridAnswer">
                                <Form.Label as="legend" column sm={2}>
                                    Your Answer :
                                </Form.Label>
                                <Col sm={10}>
                                    <input
                                        value="true"
                                        type="radio"
                                        name="answer"
                                        id="formHorizontalRadios1"
                                        checked={this.state.selectedOption === 'true'}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />Yes
                                    <br/>
                                    <input
                                        value="false"
                                        type="radio"
                                        name="answer"
                                        id="formHorizontalRadios2"
                                        checked={this.state.selectedOption === 'false'}
                                        onChange={this.handleOptionChange}
                                        className="form-check-input"
                                    />No
                                </Col>
                            </Form.Group>
                        </fieldset>

                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button  size="sm" variant="success" type="submit">
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
