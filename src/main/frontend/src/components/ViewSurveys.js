import React, {Component} from "react";
import {Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

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
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.surveys.length === 0 ?
                            <tr align="center">
                                <td colSpan="6"> No Questions Available.</td>
                            </tr> :
                            this.state.surveys.map((question) => (
                                <tr key={question.id}>
                                    <td>{question.qid}</td>
                                    <td>{question.question}</td>
                                    <td>{question.deadline}</td>
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

