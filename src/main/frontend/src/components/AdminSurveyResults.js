import React, {Component} from "react";

import {Button, Card, Col, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faList} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class AdminSurveyResults extends Component{

    constructor(props) {
        super(props);
        this.state = { surveys:[] };
        this.idChange= this.idChange.bind(this);
        this.findMyAnswers= this.findMyAnswers.bind(this);
    }

    findMyAnswers = event =>{
        event.preventDefault()
        axios.get("http://localhost:8080/api/survey/getMyAnswers/" + this.state.userid)
            .then(response => response.data)
            .then((data) => {
                this.setState({surveys : data});
            });
    }

    componentDidMount() {
    }

    idChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        const {qid} = this.state;

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> &nbsp; Results</Card.Header>
                <Form id="results" onReset={this.resetAnswer} onSubmit = {this.findMyAnswers}>
                    <Card.Body>
                        <Form.Group as={Col} controlId="formGridMyAnswers">
                            <Form.Label>Enter the question ID to find out the result: </Form.Label>
                            <Form.Control required name="qid" value={qid}
                                          onChange={this.idChange} autoComplete="off"
                                          className="bg-dark text-white"
                                          placeholder=" Question ID "/>
                        </Form.Group>
                        <br/>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faBars} /> Submit
                            </Button>
                        </Card.Footer>
                        <br/>
                        <Table bordered hover stripped variant="dark">
                            <thead>
                            <tr>
                                <th>Question ID</th>
                                <th>Yes</th>
                                <th>No</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.surveys.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6"> No Surveys Available.</td>
                                </tr> :
                                this.state.surveys.map((survey) => (
                                    <tr key={survey.id}>
                                        <td>{survey.qid}</td>
                                        <td>{survey.answer.toString()}</td>
                                        <td>{survey.answer.toString()}</td>
                                    </tr>
                                ))
                            }

                            </tbody>
                        </Table>
                    </Card.Body>
                </Form>
            </Card>
        );
    };
}
