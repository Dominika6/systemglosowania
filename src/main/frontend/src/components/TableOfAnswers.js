import React, {Component} from "react";

import {Button, Card, Col, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faSave} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {getCurrentUserId} from "./Login";

export default class TableOfAnswers extends Component{

    constructor(props) {
        super(props);
        this.state = { surveys:[], answer:[] };
        this.idChange= this.idChange.bind(this);
        this.findMyAnswers= this.findMyAnswers.bind(this);
        this.ifAnswerExist= this.ifAnswerExist.bind(this);
    }

    componentDidMount() {
        this.findAllQuestions();
    }

    submitAnswer = event => {
        const userid = getCurrentUserId();

        if (!userid) {
            alert('niezalogowany');
            return;
        }
        event.preventDefault()
        // console.log( userid + "/" + this.state.qid +"/"+ this.state.selectedOption)
        axios.post("http://localhost:8080/api/survey/addAnswer/" + userid + "/" + this.state.qid +"/"+ this.state.selectedOption)
            .then(response => {
                alert(response.data);
                window.location.reload();
            });
    }

    findAllQuestions(){
        axios.get("http://localhost:8080/api/questions/getAllQuestions")
            .then(response => response.data)
            .then((data) => {
                this.setState({surveys : data});
            });
    }


    ifAnswerExist = () =>{
        const userid = getCurrentUserId();

        if (!userid) {
            alert('niezalogowany');
            return;
        }
        // event.preventDefault()
        axios.get("http://localhost:8080/api/survey/ifAnswetExist/" + this.state.userid + "/" + this.state.qid)
            .then(response => response.data)
            .then((data) => {
                this.setState({answer : data});
            });
    }


    findMyAnswers = event =>{
        const userid = getCurrentUserId();

        if (!userid) {
            alert('niezalogowany');
            return;
        }
        event.preventDefault()
        axios.get("http://localhost:8080/api/survey/getMyAnswers/" + this.state.userid + "/" + this.state.qid)
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

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };


    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> &nbsp;My Answers</Card.Header>
                {/*<Form id="myAnswersList" onSubmit={this.findMyAnswers}>*/}
                    <Card.Body>
                        <Table bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Deadline</th>
                                    <th>Answer</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.surveys.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="6"> No Questions Available.</td>

                                    </tr> :

                                    this.state.surveys.map((questions) => (
                                        <tr key={questions.qid}>
                                            <td>{questions.question}</td>
                                            <td>{questions.deadline}</td>
                                            <td>

                                                {/*{this.ifAnswerExist.length === 0 ?*/}

                                                <Col sm={10}>
                                                    <input
                                                        value="true" type="radio" name="answer"
                                                        id="formHorizontalRadios1"
                                                        checked={this.state.selectedOption === 'true'}
                                                        onChange={this.handleOptionChange}
                                                        className="form-check-input"
                                                    />Yes
                                                    <br/>
                                                    <input
                                                        value="false" type="radio" name="answer"
                                                        id="formHorizontalRadios2"
                                                        checked={this.state.selectedOption === 'false'}
                                                        onChange={this.handleOptionChange}
                                                        className="form-check-input"
                                                    />No
                                                </Col>

                                            </td>
                                            <td>
                                                <Form onSubmit={this.submitAnswer} id="answerFormId">
                                                    <Button  size="sm" variant="success" type="submit">
                                                        <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
                                                    </Button>
                                                </Form>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                {/*</Form>*/}
            </Card>
        );
    };
}
