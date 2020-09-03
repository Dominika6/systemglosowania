import React, {Component} from "react";

import {Button, Card, Col, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faSave} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {getCurrentUserId} from "./Login";

export default class Answers extends Component{

    constructor(props) {
        super(props);
        this.state = { questions:[], answers:[], odp:[]};
        this.idChange= this.idChange.bind(this);
        this.ifAnswerExist= this.ifAnswerExist.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    findAllQuestions(){
        return axios.get("http://localhost:8080/api/questions/getAllQuestions")
            .then(response => response.data)
    }

    findMyAnswers=() =>{
        const userid = getCurrentUserId();
        if (!userid) {
            alert('niezalogowany');
            return;
        }
        return axios.get("http://localhost:8080/api/survey/getMyAnswers/" + userid)
            .then(response => response.data)
    }

    loadData= () =>{
        Promise.all([this.findAllQuestions(), this.findMyAnswers()]).then(([questions, answers]) => {
            this.setState({answers: answers, questions: questions})
        })
    }

    submitAnswer = (event, qid, selectedOption) => {
        const userid = getCurrentUserId();
        if (!userid) {
            alert('niezalogowany');
            return;
        }
        event.preventDefault()
        axios.post("http://localhost:8080/api/survey/addAnswer/" + userid + "/" + qid +"/"+ selectedOption)
            .then(response => {
                alert(response.data);
                window.location.reload();
            });
    }

    ifAnswerExist = () =>{
        const userid = getCurrentUserId();

        if (!userid) {
            alert('niezalogowany');
        }
    }

    findAnswerByQuestionId = (qid)  => {
        return this.state.answers.find(answer => {
           return answer.qid === qid;
       })
    }

    idChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value,
            activeQid: changeEvent.target.id
        });
    };

    whichAnswer(answer){
        if(answer === "true"){
            return "Yes"
        }else{
            return "No"
        }
    }

    render() {
        return(
            <>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faList}/> &nbsp;My Answers
                </Card.Header>
                <Card.Body>
                    <Table bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Question</th>
                            <th>Deadline</th>
                            <th>Answer</th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.state.questions.length === 0 ?
                            <tr align="center">
                                <td colSpan="6"> No Questions Available.</td>
                            </tr> :

                            this.state.questions.map((questions) => {
                                const matchingAnswer = this.findAnswerByQuestionId(questions.qid);

                                return  <tr key={questions.qid}>
                                    <td>{questions.question}</td>
                                    <td>{questions.deadline}</td>
                                    <td>
                                        {matchingAnswer
                                            ?
                                            <div>
                                                {this.whichAnswer(matchingAnswer.answer.toString())}
                                            </div>
                                            :
                                            <div>

                                                <Form onSubmit={this.submitAnswer} id="answerFormId">
                                                    <Form.Group controlId="formGridEmail1" sm={10}>
                                                        <Col sm={10} className="ml-3">
                                                            <input
                                                                value="true" type="radio" name="answer"
                                                                id={questions.qid}
                                                                checked={this.state.selectedOption === 'true' && this.state.activeQid === questions.qid}
                                                                onChange={this.handleOptionChange}
                                                                className="form-check-input"
                                                            /> Yes
                                                            <br/>
                                                            <input
                                                                value="false" type="radio" name="answer"
                                                                id={questions.qid}
                                                                checked={this.state.selectedOption === 'false' && this.state.activeQid === questions.qid}
                                                                onChange={this.handleOptionChange}
                                                                className="form-check-input"
                                                            /> No
                                                        </Col>
                                                    </Form.Group>
                                                    <Button  size="sm" variant="success" type="submit" onClick={event => this.submitAnswer(event, questions.qid, this.state.selectedOption)}>
                                                        <FontAwesomeIcon icon={faSave} /> &nbsp;Submit
                                                    </Button>
                                                </Form>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            </>
        );
    };
}
