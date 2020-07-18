import React, {Component} from "react";

import {Card, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {getCurrentUserId} from "./Login";

export default class MyAnswers extends Component{

    constructor(props) {
        super(props);
        this.state = { surveys:[] };
        this.idChange= this.idChange.bind(this);
        this.findMyAnswers= this.findMyAnswers.bind(this);
    }

    findMyAnswers = event =>{
        const userid = getCurrentUserId();

        if (!userid) {
            alert('niezalogowany');
            return;
        }
        event.preventDefault()
        axios.get("http://localhost:8080/api/survey/getMyAnswers/" + this.state.userid)
            .then(response => response.data)
            .then((data) => {
                this.setState({surveys : data});
            });
    }

    idChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> &nbsp;My Answers</Card.Header>
                <Form id="myAnswersList" onSubmit={this.findMyAnswers}>
                    <Card.Body>
                        {/*<Form.Group as={Col} controlId="formGridMyAnswers">*/}
                        {/*    <Form.Label>Your ID:</Form.Label>*/}
                        {/*    <Form.Control required name="userid" value={userid}*/}
                        {/*                  onChange={this.idChange} autoComplete="off"*/}
                        {/*                  className="bg-dark text-white"*/}
                        {/*                  placeholder="Enter Your Id"/>*/}
                        {/*</Form.Group>*/}

                        {/*<br/>*/}
                        {/*<Card.Footer style={{"textAlign":"right"}}>*/}
                        {/*    <Button size="sm" variant="success" type="submit">*/}
                        {/*        <FontAwesomeIcon icon={faSave} />&nbsp; Submit*/}
                        {/*    </Button>*/}
                        {/*</Card.Footer>*/}
                        {/*<br/>*/}
                        <Table bordered hover stripped variant="dark">
                            <thead>
                                <tr>
                                    <th>Question ID</th>
                                    <th>Answer</th>
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
