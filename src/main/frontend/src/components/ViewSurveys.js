import React, {Component} from "react";
import {Button, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {getApiUrl} from "../utils/apiUrl";

export default class ViewSurveys extends Component{

    constructor(props) {
        super(props);
        this.state = {
            surveys : []
        };
    }

    componentDidMount() {
        this.findAllQuestions();
    }

    deleteQuestion(event, question) {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        event.preventDefault();

        const url = getApiUrl(`/questions/deleteQuestionById/${question.qid}`);

        console.log(question);
        console.log('question id', question.qid);

        axios.delete(url)
            .then(response => {
                if(response.data != null){

                    alert(response.data);
                    window.location.reload();
                }
            });
    }

    findAllQuestions(){
        axios.get("http://localhost:8080/api/questions/getAllQuestions")
            .then(response => response.data)
            .then((data) => {
                this.setState({surveys : data});
            });
    }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> &nbsp; Questions: </Card.Header>
                <Card.Body>
                    <Table bordered hover stripped variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Question</th>
                            <th>Deadline</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.surveys.length === 0 ?
                            <tr align="center">
                                <td colSpan="6"> No Questions Available.</td>
                            </tr> :
                            this.state.surveys.map((question) => (
                                <tr key={question.qid}>
                                    <td>{question.qid}</td>
                                    <td>{question.question}</td>
                                    <td>{question.deadline}</td>
                                    <td><Button onClick={event => this.deleteQuestion(event, question)}>Delete</Button></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    };
}

