import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class CastYourVote extends Component{

    constructor(props) {
        super(props);
        this.state = { questions:[], selectedOption:""};
        this.answerChange = this.answerChange.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
    }

    initialState = {
        question:'', deadline:''
    }

    submitQuestion = event => {
        let questionToUrl = this.state.question.replace("?", "%3F")
        event.preventDefault();
        axios.post("http://localhost:8080/api/questions/addQuestion/" + questionToUrl + "/" + this.state.deadline )
            .then(response => {
                this.setState(this.initialState);
                alert(response.data);
                window.location.reload();
            });
    }

    answerChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        const {question, deadline} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} />&nbsp; Add Question</Card.Header>

                <Form onSubmit={this.submitQuestion} id="answerFormId">
                    <Card.Body>
                        <Form.Group as={Col} controlId="formGridQuestion">
                            <Form.Label>The content of the question: </Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="question"
                                          value={question} onChange={this.answerChange}
                                          className="bg-dark text-white"
                                          placeholder="Type the question" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridQid">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="deadline" type="date"
                                          value={deadline} onChange={this.answerChange}
                                          className="bg-dark text-white"
                                          placeholder="Enter deadline" />
                        </Form.Group>

                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button  size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    };
}
