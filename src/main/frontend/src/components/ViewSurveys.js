import React, {Component} from "react";
import {Button, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
// import {getApiUrl} from "../utils/apiUrl";

export default class ViewSurveys extends Component{

    constructor(props) {
        super(props);
        this.state = {
            surveys : []
        };
        this.nameChange = this.nameChange.bind(this);
        this.deleteQuestion= this.deleteQuestion.bind(this);
    }


    deleteQuestion = (event, questions) => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        event.preventDefault();

        this.setState({
            [event.target.name]:event.target.value
        });

        // const url = getApiUrl(`/questions/deleteQuestionById/${questions.qid}`);

        console.log(questions);
        console.log('question id', questions.qid);

        // axios.delete(url)
        axios.delete("http://localhost:8080/api/questions/deleteQuestionById/" + questions.qid)
            .then(response => {
                console.log("w axiosie")

                if(response.data != null){
                    alert(response.data);
                    window.location.reload();
                }
                console.log("tu")

            });
    }
    nameChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
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
                    <Table bordered hover variant="dark">
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
                            this.state.surveys.map((questions) => (
                                <tr key={questions.qid}>
                                    <td>{questions.qid}</td>
                                    <td>{questions.question}</td>
                                    <td>{questions.deadline}</td>
                                    <td><Button size="sm" variant="danger" type="submit" onClick={event => this.deleteQuestion(event, questions)}>
                                            <FontAwesomeIcon icon={faTrash} />&nbsp; Delete
                                        </Button>
                                    </td>
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

