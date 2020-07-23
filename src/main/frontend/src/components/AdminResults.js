import React, {Component} from "react";

import {Button, Card, Col, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAmericanSignLanguageInterpreting, faBars, faList} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {getCurrentUserId} from "./Login";


export default class AdminSurveyResults extends Component{

    constructor(props) {
        super(props);
        this.state = { surveys:[], answers:[]} ;
        this.idChange= this.idChange.bind(this);
        this.findAnswers= this.findAnswers.bind(this);
        // this.findMyAnswers= this.findMyAnswers.bind(this);
    }

    componentDidMount() {
        this.findAllQuestions();
        // this.findAnswers();
    }

    findAllQuestions(){
        axios.get("http://localhost:8080/api/questions/getAllQuestions")
            .then(response => response.data)
            .then((data) => {
                this.setState({surveys : data});
            });
    }

    // getResults(){
    //     {this.state.answers.map((answer) => (
    //         <tr key={answer.qid}>
    //             <td>{answer.answer}</td>
    //             <td>{answer.ile}</td>
    //         </tr>
    //     ))
    //
    //     }
    // }


    findAnswers(){
        // const userid = getCurrentUserId();
        //
        // if (!userid){
        //     alert('');
        //     return;
        // }
        // event.preventDefault()
        axios.get("http://localhost:8080/api/survey/getTrueFalseByQid/" + this.state.qid)
            .then(response => response.data)
            .then((data) => {
                this.setState({surveys : data});
                alert(data);
            });
    }
     // findMyAnswers = event =>{
    //     const userid = getCurrentUserId();
    //
    //     if (!userid){
    //         alert('');
    //         return;
    //     }
    //     event.preventDefault()
    //     axios.get("http://localhost:8080/api/survey/getMyAnswers/" + userid)
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({answers : data});
    //         });
    // }

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

                        <br/>
                        <Table bordered hover stripped variant="dark">
                            <thead>
                            <tr>
                                <th>Question</th>
                                <th>Deadline</th>
                                <th>Yes</th>
                                <th>No</th>
                                <th>Votes cast</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.surveys.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6"> No Surveys Available.</td>
                                </tr> :
                                this.state.surveys.map((survey) => (
                                    <tr key={survey.id}>
                                        <td>{survey.question}</td>
                                        <td>{survey.deadline}</td>

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
